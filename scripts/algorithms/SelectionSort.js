class SelectionSort extends Sorter {
    constructor() {
        super();

        this.name = "Selection Sort";
    }
    
    * sort() {
        let start = 0;
        while(start < this.arr.length) {
            let minIdx = start;
            for(let i = start; i < this.arr.length; i++) {
                if(this.doCompare(minIdx, i)) {
                    minIdx = i;
                }
                yield;
            }
            this.doSwap(start, minIdx);
            yield;

            start++;
        }
    }
}