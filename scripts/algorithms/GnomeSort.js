class GnomeSort extends Sorter {
    * sort() {
        let i = 0;
        while(i < this.arr.length-1) {
            if(i >= 0 && this.doCompare(i, i+1)) {
                this.doSwap(i, i+1);
                i--;
            } else {
                i++;
            }
            yield;
        }
    }
}