class Shuffle extends Sorter {
    constructor() {
        super();

        this.name = "Shuffling...";
    }
    
    * sort() {
        yield;

        for(let i = this.arr.length-1; i >= 0; i--) {
            let r = Math.floor(Math.random()*i)
            this.doSwap(i, r)
            yield;
        }
    }
}