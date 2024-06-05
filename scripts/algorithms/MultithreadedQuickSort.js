class MultithreadedQuickSort extends Sorter {
    constructor(opts) {
        super();

        if(!opts) opts = {};
        this.pivotStyle = opts.pivotStyle || "Last Element";
        this.maxThreads = opts.maxThreads || 2;

        this.name = "Multithreaded Quicksort";

        this.actions = [];
        this.threads = [];
    }

    specificInfo() {
        return [
            this.name,
            `Maximum Threads: ${this.maxThreads}`,
            `Current Open Threads: ${this.threads.length}`,
            `Pivot: ${this.pivotStyle}`
        ];
    }

    * sort() {
        this.actions = [[0, this.arr.length-1]];
        this.threads = [];

        while(this.actions.length > 0 || this.threads.length > 0) {
            while(this.actions.length > 0 && this.threads.length < this.maxThreads) {
                this.threads.push(this.recurse(...this.actions.shift()));
            }

            for(let i = this.threads.length-1; i >= 0; i--) {
                let done = this.threads[i].next().done;
                if(done) this.threads.splice(i, 1);
            }
            yield;
        }
    }

    * recurse(start, end) {
        if(start >= end) return;
        
        //chooses a pivot and moves it to the end
        yield* this.choosePivot(start, end);

        //partition
        yield* this.partition(start, end)
    }

    //chooses a pivot and swaps it with end
    * choosePivot(start, end) {
        if(this.pivotStyle == "Last Element") return;

        if(this.pivotStyle == "Median of Three") {
            let mid = Math.floor((start+end)/2);
            if(this.doCompare(start, end)) this.doSwap(start, end);
            yield;
            if(this.doCompare(end, mid)) this.doSwap(end, mid);
            yield;
            if(this.doCompare(start, end)) this.doSwap(start, end);
            yield;
        }
    }

    * partition(start, end) {
        let i = start;
        let j = end - 1;
        while(i <= j) {
            if(this.doCompare(end, j)) {
                this.doSwap(i, j);
                i++;
            } else {
                j--;
            }

            yield;
        }

        this.doSwap(i, end);

        yield;

        //recurse
        this.actions.push([start, i-1]);
        this.actions.push([i+1, end]);
    }
}