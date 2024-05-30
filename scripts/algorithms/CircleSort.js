class CircleSort extends Sorter {
    constructor() {
        super();

        this.name = "Circle Sort";
    }
    
    * sort() {
        while(!this.checkSorted()){
            yield* this.recurse(0, this.arr.length-1);
            // speed = Math.max();
        }
    }

    checkSorted() {
        for(let i = 0; i < this.arr.length - 1; i++) {
            if(this.doCompare(i, i+1)) return false;
        }
        return true;
    }

    * recurse(start, end) {
        if(start >= end) return;

        let sp = start;
        let ep = end;
        while(sp < ep) {
            if(this.doCompare(sp, ep)) {
                this.doSwap(sp, ep);
            }
            sp++;
            ep--;
            yield;
        }
        yield* this.recurse(start, Math.floor((start+end)/2));
        yield* this.recurse(Math.floor((start+end)/2) + 1, end);
    }

    * insertionSort(start, end) {
        for(let i = start+1; i <= end; i++) {
            let j = i;
            while(j > start && this.doCompare(j-1, j)) {
                this.doSwap(j, j-1);
                j--;
                yield;
            }
            yield;
        }
    }
}