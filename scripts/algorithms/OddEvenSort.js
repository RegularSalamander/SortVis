class OddEvenSort extends Sorter {
    constructor() {
        super();

        this.name = "Odd-Even Sort";
    }

    * sort() {
        let swapped = true;
        
        while(swapped) {
            swapped = false;
            for(let i = 0; i < this.arr.length - 1; i += 2) {
                if(this.doCompare(i, i+1)) {
                    this.doSwap(i, i+1);
                    swapped = true;
                }
                yield;
            }

            for(let i = 1; i < this.arr.length - 1; i += 2) {
                if(this.doCompare(i, i+1)) {
                    this.doSwap(i, i+1);
                    swapped = true;
                }
                yield;
            }
        }
    }
}