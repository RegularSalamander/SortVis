class ThreeWayRadixQuickSort extends Sorter {
    constructor(opts) {
        super();

        if(!opts) opts = {};
        this.pivotStyle = opts.pivotStyle || "Last Element";
        this.base = opts.base || 4;

        this.name = "Three-way Radix Quicksort";
    }

    specificInfo() {
        return [
            this.name,
            `Base ${this.base}`,
            `Pivots: ${this.pivotStyle}`
        ];
    }

    * sort() {
        let max = -Infinity;
        for(let i = 0; i < this.arr.length; i++) {
            let e = this.doRead(i).value;
            if(e > max) max = e;
            yield;
        }
        let maxExp = Math.floor(Math.log(max) / Math.log(this.base));

        yield* this.recurse(0, this.arr.length-1, maxExp);
    }

    * recurse(start, end, exponent) {
        if(start >= end) return;
        
        //chooses a pivot and moves it to the end
        yield* this.choosePivot(start, end);

        //partition
        yield* this.partition(start, end, exponent);
    }

    //chooses a pivot and swaps it with end
    * choosePivot(start, end) {
        if(this.pivotStyle == "Last Element") return;

        if(this.pivotStyle == "Median of Three") {
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
    }

    * partition(start, end, exponent) {
        let pivot = this.doRead(end).value
        let pivotDig = Math.floor((pivot % Math.pow(this.base, exponent+1)) / Math.pow(this.base, exponent));
        yield;
        
        let i = start;
        let j = start;
        let k = end - 1;
        while(j <= k) {
            let e = this.doRead(j).value;
            let dig = Math.floor((e % Math.pow(this.base, exponent+1)) / Math.pow(this.base, exponent));


            if(dig < pivotDig) {
                //first partition, swap with i
                this.doSwap(i, j);
                i++;
                j++;
            } else if(dig == pivotDig) {
                //second partition, leave at j
                j++;
            } else {
                //third partition, swap with k
                this.doSwap(j, k);
                k--;
            }

            yield;
        }

        this.doSwap(end, k+1);
        yield;

        yield* this.recurse(start, i-1, exponent);
        yield* this.recurse(i, k+1, exponent - 1);
        yield* this.recurse(k+2, end, exponent);
    }
}