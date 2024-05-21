class BinaryInsertionSort extends Sorter {
    constructor() {
        super();

        this.name = "Binary Insertion Sort";
    }
    
    * sort() {
        yield;

        for(let i = 1; i < this.arr.length; i++) {
            let low = 0;
            let high = i;
            while(low < high) {
                let mid = Math.floor((low+high)/2);
                if(this.doCompare(i, mid)) 
                    low = mid+1;
                else
                    high = mid;
                yield;
            }

            for(let j = i-1; j >= low; j--) {
                this.doSwap(j, j+1);
                yield;
            }
        }
    }
}