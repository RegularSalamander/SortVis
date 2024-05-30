class StrandSortV2 extends Sorter {
    constructor() {
        super();

        this.name = "Strand Sort";
    }

    writeInfo() {
        this.drawInfoList([
            this.name || "(No algorithm)",
            `Version 2 (iterative merging)`,
            null,
            `N = ${this.nf(this.arr.length)}`,
            null,
            `Comparisons: ${this.nf(this.compares)}`,
            `Reads: ${this.nf(this.reads)}`,
            `Writes: ${this.nf(this.writes)}`,
            `Swaps: ${this.nf(this.swaps)}`
        ]);
    }
    
    * sort() {
        let sublists = [0];
        let maxIdx = 0;
        while(maxIdx < this.arr.length) {
            for(let i = maxIdx; i < this.arr.length; i++) {
                if(this.doCompare(i, maxIdx)) {
                    maxIdx++;
                    this.doSwap(i, maxIdx);
                    
                }
                yield;
            }
            maxIdx++;
            sublists.push(maxIdx);
        }

        while(sublists.length > 2) {
            for(let i = sublists.length - 3; i >= 0; i -= 2) {
                yield* this.merge(sublists[i], sublists[i+1], sublists[i+2]);
                sublists.splice(i+1, 1);
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