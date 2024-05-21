class MergeSort extends Sorter {
    constructor() {
        super();

        this.name = "Merge Sort";
    }
    
    * sort() {
        yield* this.recurse(0, this.arr.length-1);
    }

    * recurse(start, end) {
        if(start >= end) return;

        const mid = Math.floor((start+end)/2)

        //recurse
        yield* this.recurse(start, mid);
        yield* this.recurse(mid+1, end);

        //merge
        yield* this.merge(start, mid, end);
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