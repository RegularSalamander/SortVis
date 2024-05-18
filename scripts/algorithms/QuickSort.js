class QuickSort extends Sorter {
    * sort() {
        yield* this.recurse(0, this.arr.length-1);
    }

    * recurse(start, end) {
        if(start >= end) return;
        
        //chooses a pivot and moves it to the end
        yield* this.choosePivot(start, end);

        //partition
        yield* this.partition(start, end)
    }

    * choosePivot(start, end) {
        //get partition as median of three and move to end
        let mid = Math.floor((start+end)/2);
        if(this.doCompare(start, mid)) this.doSwap(start, mid);
        yield;
        if(this.doCompare(mid, end)) this.doSwap(mid, end);
        yield;
        if(this.doCompare(start, mid)) this.doSwap(start, mid);
        yield;

        this.doSwap(mid, end);
        yield;
    }

    * partition(start, end) {
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