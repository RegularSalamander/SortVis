class MergeSort extends Sorter {
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
        let startpointer = start;
        let midpointer = mid+1;
        let mergeArray = [];
        while(startpointer <= mid && midpointer <= end) {
            if(this.doCompare(midpointer, startpointer)) {
                mergeArray.push(this.arr[startpointer]);
                startpointer++;
            } else {
                mergeArray.push(this.arr[midpointer]);
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