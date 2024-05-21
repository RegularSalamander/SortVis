class StoogeSort extends Sorter {
    * sort() {
        yield* this.recurse(0, this.arr.length-1);
    }

    * recurse(start, end) {
        if(start >= end) return;
        if(end - start == 1) {
            if(this.doCompare(start, end)) {
                this.doSwap(start, end);
            }
            yield;
            return;
        }

        if(end - start + 1 >= 3) {
            let third = Math.floor((end - start + 1)/3);
            yield* this.recurse(start, end - third);
            yield* this.recurse(start + third, end);
            yield* this.recurse(start, end - third);
        }
    }
}