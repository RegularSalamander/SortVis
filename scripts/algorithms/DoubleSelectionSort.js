class DoubleSelectionSort extends Sorter {
    constructor() {
        super();

        this.name = "Double Selection Sort";
    }
    
    * sort() {
        let start = 0;
        let end = this.arr.length - 1;
        while(start < end) {
            let minIdx = start;
            let maxIdx = end;
            if(this.doCompare(minIdx, maxIdx)) {
                this.doSwap(minIdx, maxIdx);
            }
            yield;

            for(let i = start; i <= end; i++) {
                if(this.doCompare(minIdx, i)) {
                    minIdx = i;
                } else if(this.doCompare(i, maxIdx)) {
                    maxIdx = i;
                }
                yield;
            }
            this.doSwap(start, minIdx);
            this.doSwap(end, maxIdx);
            yield;

            start++;
            end--;
        }
    }
}