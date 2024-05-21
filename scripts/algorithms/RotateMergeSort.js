class RotateMergeSort extends Sorter {
    constructor() {
        super();

        this.name = "Rotate Merge Sort";
    }
    
    * sort() {
        for(let w = 1; w < this.arr.length; w *= 2) {
            for(let i = 0; i < this.arr.length; i += w*2) {
                yield* this.merge(i, Math.min(i+w, this.arr.length), Math.min(i+w*2, this.arr.length));
            }
        }
    }

    * merge(start, mid, end) {
        if(end - start <= 4) {
            //perform insertion sort to merge
            for(let i = start + 1; i < end; i++) {
                let j = i;
                while(j > start && this.doCompare(j-1, j)) {
                    this.doSwap(j, j-1);
                    j--;
                    yield;
                }
                yield;
            }
            return;
        }

        let split1 = Math.ceil((start+mid)/2);
        let split2 = mid;
        while(split2 < end && this.doCompare(mid-1, split2)){
            split2++;
            yield;
        }

        yield* this.rotate(split1, mid, split2);

        yield* this.merge(start, split1, split1 + split2 - mid);
        yield* this.merge(split1 + split2 - mid, split2, end);
    }

    * rotate(start, mid, end) {
        yield* this.reverse(start, mid - 1);
        yield* this.reverse(mid, end - 1);
        yield* this.reverse(start, end - 1);
    }

    * reverse(start, end) {
        for(let i = 0; i < (end + 1 - start)/2; i++) {
            this.doSwap(start + i, end - i)
            yield;
        }
    }
}