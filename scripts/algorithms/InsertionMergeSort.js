class InsertionMergeSort extends Sorter {
    constructor(opts) {
        super();

        if(!opts) opts = {};
        this.shrink = opts.shrink || 2;
        this.startGap = opts.startGap || 1;

        this.name = `Insertion-Merge Sort`;
    }
    
    * sort() {
        for(let w = this.startGap; w < this.arr.length; w *= 2) {
            for(let i = 0; i < this.arr.length; i += w*2) {
                yield* this.merge(i, Math.min(i+w, this.arr.length), Math.min(i+w*2, this.arr.length));
            }
        }
    }

    * merge(start, mid, end) {
        console.log(start, mid, end);

        let gap = end - start - 1;

        while(gap > 1) {
            gap = Math.max(Math.floor(gap/this.shrink), 1);

            for(let i = start + gap; i < end; i++) {
                let j = i;
                while(j >= start + gap && this.doCompare(j-gap, j)) {
                    this.doSwap(j, j-gap);
                    j -= gap;
                    yield;
                }
                yield;
            }
        }
    }
}