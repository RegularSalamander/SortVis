class BubbleSort extends Sorter {
    * sort() {
        yield;

        for(let i = this.arr.length-1; i >= 1; i--) {
            for(let j = 0; j < i; j++) {
                if(this.doCompare(j, j+1)) {
                    this.doSwap(j, j+1);
                }
                yield;
            }
        }
    }
}