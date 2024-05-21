class BogoSort extends Sorter {
    constructor() {
        super();

        this.name = "Bogo Sort";
    }
    
    * sort() {
        let sorted = false;
        while(!sorted) {
            //shuffle
            for(let i = this.arr.length - 1; i >= 0; i--) {
                let r = Math.floor(Math.random()*i)
                this.doSwap(i, r)
                yield;
            }

            sorted = true;
            //check sorted
            for(let i = 0; i < this.arr.length - 1; i++) {
                if(this.doCompare(i, i+1)) {
                    sorted = false;
                    break;
                }
                yield;
            }
        }
    }
}