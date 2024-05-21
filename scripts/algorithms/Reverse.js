class Reverse extends Sorter {
    constructor() {
        super();

        this.name = "Reversing...";
    }
    
    * sort() {
        for(let i = 0; i < this.arr.length/2; i++) {
            this.doSwap(i, this.arr.length-i-1);
            yield;
        }
    }
}