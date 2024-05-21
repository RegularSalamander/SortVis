class Reset extends Sorter {
    constructor() {
        super();

        this.name = "Resetting...";
    }
    
    * sort() {
        for(let i = 0; i < this.arr.length; i++) {
            let dst = this.doRead(0).index;
            do{
                this.doSwap(i, dst);
                dst = this.doRead(i).index;
                yield;
            }
            while(dst != i);
            
        }
    }
}