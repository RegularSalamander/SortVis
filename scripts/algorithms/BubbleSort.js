class BubbleSort extends Sorter {
    constructor() {
        super();

        this.name = "Bubble Sort";
    }

    * sort() {
        let swapped = true;
        let end = this.arr.length - 1;
        while(end > 0 && swapped) {
            swapped = false;
            for(let i = 0; i < end; i++) {
                if(this.doCompare(i, i+1)) {
                    this.doSwap(i, i+1);
                    swapped = true;
                }
                yield;
            }

            end--;
        }
    }
}