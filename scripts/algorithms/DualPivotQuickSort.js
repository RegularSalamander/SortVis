class DualPivotQuickSort extends Sorter {
    constructor(opts) {
        super();

        if(!opts) opts = {};
        this.pivotStyle = opts.pivotStyle || "Last Element";

        this.name = "Dual Pivot Quicksort";
    }

    specificInfo() {
        return [
            this.name,
            `Pivots: ${this.pivotStyle}`
        ];
    }

    * sort() {
        yield* this.recurse(0, this.arr.length-1);
    }

    * recurse(start, end) {
        if(start >= end) return;
        
        //chooses a pivot and moves it to the end
        yield* this.choosePivot(start, end);

        //partition
        yield* this.partition(start, end);
    }

    //chooses a pivot and swaps it with end
    * choosePivot(start, end) {
        if(this.pivotStyle == "First and Last Elements") {
            if(this.doCompare(start, end)) {
                this.doSwap(start, end);
            }
            yield;
        } else if(this.pivotStyle == "Last Two Elements") {
            this.doSwap(end-1, start);
            if(this.doCompare(start, end)) {
                this.doSwap(start, end);
            }
            yield;
        } else if(this.pivotStyle == "Middle Two of Four") {
            let third = Math.floor(start + (end-start)/3);
            let twothird = Math.floor(start + (end-start)*2/3);
            if(this.doCompare(start, third)) this.doSwap(start, third);
            yield;
            if(this.doCompare(third, twothird)) this.doSwap(third, twothird);
            yield;
            if(this.doCompare(twothird, end)) this.doSwap(twothird, end);
            yield;
            if(this.doCompare(start, third)) this.doSwap(start, third);
            yield;
            if(this.doCompare(third, twothird)) this.doSwap(third, twothird);
            yield;
            if(this.doCompare(start, third)) this.doSwap(start, third);
            yield;

            this.doSwap(twothird, end);
            this.doSwap(third, start);
            yield;
        }
    }

    * partition(start, end) {
        let i = start + 1;
        let j = start + 1;
        let k = end - 1;
        while(j <= k) {
            if(this.doCompare(start, j)) {
                //first partition, swap with i
                this.doSwap(i, j);
                i++;
                j++;
            } else if(this.doCompare(end, j)) {
                //second partition, leave at j
                j++;
            } else {
                //third partition, swap with k
                this.doSwap(j, k);
                k--;
            }

            yield;
        }

        this.doSwap(start, i-1);
        this.doSwap(end, k+1);
        yield;

        yield* this.recurse(start, i-2);
        yield* this.recurse(i, k);
        yield* this.recurse(k+2, end);
    }
}