class IterativeMergeSort extends Sorter {
    constructor() {
        super();

        this.name = "Iterative Merge Sort";
    }
    
    * sort() {
        for(let w = 1; w < this.arr.length; w *= 2) {
            for(let i = 0; i < this.arr.length; i += w*2) {
                yield* this.merge(i, Math.min(i+w, this.arr.length), Math.min(i+w*2, this.arr.length));
            }
        }
    }

    * merge(start, mid, end) {
        let startpointer = start;
        let midpointer = mid;
        let mergeArray = [];
        while(startpointer < mid && midpointer < end) {
            if(!this.doCompare(startpointer, midpointer)) {
                mergeArray.push(this.arr[startpointer]);
                startpointer++;
            } else {
                mergeArray.push(this.arr[midpointer]);
                midpointer++;
            }
            yield;
        }
        while(startpointer < mid) {
            mergeArray.push(this.doRead(startpointer));
            startpointer++;
            yield;
        }
        while(midpointer < end) {
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