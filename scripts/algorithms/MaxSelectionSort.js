class MaxSelectionSort extends Sorter {
    constructor() {
        super();

        this.name = "Selection Sort (max)";
    }
    
    * sort() {
        let end = this.arr.length - 1;
        while(end > 0) {
            let maxIdx = end;
            for(let i = 0; i < end; i++) {
                if(this.doCompare(i, maxIdx)) {
                    maxIdx = i;
                }
                yield;
            }
            this.doSwap(end, maxIdx);
            yield;

            end--;
        }
    }
}