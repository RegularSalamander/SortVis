class InsertionSort extends Sorter {
    * sort() {
        yield;

        for(let i = 0; i < this.arr.length; i++) {
            let j = i;
            while(j >= 0 && this.doCompare(j-1, j)) {
                this.doSwap(j, j-1);
                j--;
                yield;
            }
        }
    }
}