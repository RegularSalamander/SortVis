class Reset extends Sorter {
    constructor() {
        super();

        this.name = "Resetting...";
    }
    
    * sort() {
        for(let i = 0; i < this.arr.length; i++) {
            let dst = this.arr[i].index;
            while(dst != i) {
                this.doSwap(i, dst);
                dst = this.arr[i].index;
                yield;
            }
        }
    }
}