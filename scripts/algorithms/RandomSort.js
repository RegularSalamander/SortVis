class RandomSort extends Sorter {
    constructor(opts) {
        super();

        if(!opts) opts = {};
        this.limit = opts.limit || Infinity;

        this.name = "Random Sort";
    }

    * sort() {
        for(let count = 0; count < this.limit; count++) {
            let i = Math.floor(Math.random()*this.arr.length);
            let j = Math.floor(Math.random()*this.arr.length);
            if(this.doCompare(Math.min(i, j), Math.max(i, j))) {
                this.doSwap(i, j);
            }
            yield;
        }

        for(let i = 1; i < this.arr.length; i++) {
            let j = i;
            while(j > 0 && this.doCompare(j-1, j)) {
                this.doSwap(j, j-1);
                j--;
                yield;
            }
            yield;
        }
    }
}