class MultithreadedMergeSort extends Sorter {
    constructor(opts) {
        super();

        if(!opts) opts = {};
        this.maxThreads = opts.maxThreads || 2;

        this.name = "Multithreaded Merge Sort";

        this.waitingActions = [];
        this.readyActions = [];
        this.finishedActions = [];
        this.threads = [];
    }

    specificInfo() {
        return [
            this.name,
            `Maximum Threads: ${this.maxThreads}`,
            `Current Open Threads: ${this.threads.length}`
        ];
    }
    
    * sort() {
        yield* this.recurse(0, this.arr.length-1);

        while(this.readyActions.length > 0 || this.waitingActions.length > 0 || this.threads.length > 0) {
            //add any ready actions to available threads
            while(this.readyActions.length > 0 && this.threads.length < this.maxThreads) {
                let fin = this.readyActions.shift();
                let iter = this.merge(...fin);
                iter.fin = fin;
                this.threads.push(iter);
            }

            //advance open threads
            for(let i = this.threads.length-1; i >= 0; i--) {
                let done = this.threads[i].next().done;
                if(done) {
                    this.finishedActions.push(this.threads[i].fin);
                    this.threads.splice(i, 1);
                    //check if any waiting actions can be readied
                    for(let i = this.waitingActions.length - 1; i >= 0; i--) {
                        let left = -1;
                        let right = -1;
                        for(let j = this.finishedActions.length - 1; j >= 0; j--) {
                            if(
                                this.waitingActions[i][0] == this.finishedActions[j][0]
                                &&
                                this.waitingActions[i][1] == this.finishedActions[j][2]
                            ) left = j;
                            if(
                                this.waitingActions[i][1] + 1 == this.finishedActions[j][0]
                                &&
                                this.waitingActions[i][2] == this.finishedActions[j][2]
                            ) right = j;

                            if(left >= 0 && right >= 0) break;
                        }
                        if(left >= 0 && right >= 0) {
                            this.finishedActions.splice(Math.max(left, right), 1);
                            this.finishedActions.splice(Math.min(left, right), 1);
                            this.readyActions.unshift(this.waitingActions.splice(i, 1)[0]);
                        }
                    }
                }
            }
            yield;
        }
    }

    * recurse(start, end) {
        const mid = Math.floor((start+end)/2);

        if(end - start <= 1) {
            this.readyActions.push([start, mid, end]);
            return;
        }

        //recurse
        yield* this.recurse(start, mid);
        yield* this.recurse(mid+1, end);

        //merge
        this.waitingActions.push([start, mid, end]);
    }

    * merge(start, mid, end) {
        let startpointer = start;
        let midpointer = mid+1;
        let mergeArray = [];
        while(startpointer <= mid && midpointer <= end) {
            if(!this.doCompare(startpointer, midpointer)) {
                mergeArray.push(this.doRead(startpointer));
                startpointer++;
            } else {
                mergeArray.push(this.doRead(midpointer));
                midpointer++;
            }
            yield;
        }
        while(startpointer <= mid) {
            mergeArray.push(this.doRead(startpointer));
            startpointer++;
            yield;
        }
        while(midpointer <= end) {
            mergeArray.push(this.doRead(midpointer));
            midpointer++;
            yield;
        }

        for(let i = 0; i < mergeArray.length; i++) {
            this.doWrite(start+i, mergeArray[i]);
            yield;
        }
    }
}