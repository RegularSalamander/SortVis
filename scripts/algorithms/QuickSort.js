class QuickSort extends Sorter {
    constructor(opts) {
        super();

        if(!opts) opts = {};
        this.partitionType = opts.partitionType || "LL";
        this.pivotStyle = opts.pivotStyle || "Last Element";
        this.insertionCutoff = opts.insertionCutoff || 0;

        this.name = "Quicksort";
    }

    specificInfo() {
        if(this.insertionCutoff) {
            return [
                this.name,
                `${this.partitionType} Pointers`,
                `Pivot: ${this.pivotStyle}`,
                `Insertion Sort Cutoff: ${this.insertionCutoff}`
            ];
        } else {
            return [
                this.name,
                `${this.partitionType} Pointers`,
                `Pivot: ${this.pivotStyle}`
            ];
        }
    }

    * sort() {
        yield* this.recurse(0, this.arr.length-1);
    }

    * recurse(start, end) {
        if(start >= end) return;

        if(end - start < this.insertionCutoff){
            yield* this.insertionSort(start, end);
            return;
        }
        
        //chooses a pivot and moves it to the end
        yield* this.choosePivot(start, end);

        //partition
        yield* this.partition(start, end)
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

    * partition(start, end) {

        if(this.partitionType == "LL") {
            let i = start;
            let j = start;
            while(j < end) {
                if(this.doCompare(end, j)) {
                    this.doSwap(i, j);
                    i++;
                }
                j++;

                yield;
            }

            this.doSwap(i, end);
            yield;

            //recurse
            yield* this.recurse(start, i-1);
            yield* this.recurse(i+1, end);
        } else if(this.partitionType == "LR") {
            let i = start;
            let j = end - 1;
            while(i <= j) {
                if(this.doCompare(end, j)) {
                    this.doSwap(i, j);
                    i++;
                } else {
                    j--;
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