class QuickSort extends Sorter {
    * sort() {
        yield* this.recurse(0, this.arr.length-1);
    }

    * recurse(start, end) {
        if(start >= end) return;

        //partition
        let i = start;
        for(let j = start; j < end; j++) {
            if(this.doCompare(end, j)) {
                this.doSwap(i, j);
                i++;
            }
            yield;
        }

        this.doSwap(i, end);
        yield;

        //recurse
        yield* this.recurse(start, i-1);
        yield* this.recurse(i+1, end);
    }
}