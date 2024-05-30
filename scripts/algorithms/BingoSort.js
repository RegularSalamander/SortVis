class BingoSort extends Sorter {
    constructor() {
        super();

        this.name = "Bingo Sort";
    }
    
    * sort() {
        let last = this.arr.length - 1;

        //this algorithm uses Math.floor to remove the Math.random added to list values
        let nextMax = Math.floor(this.doRead(last).value);
        for(let i = last - 1; i >= 0; i--) {
            let e = Math.floor(this.doRead(i).value);
            if(this.doValueCompare(e, nextMax)) {
                nextMax = e;
            }
            yield;
        }
        while(last > 0 && nextMax == Math.floor(this.doRead(last).value))
            last--;

        while(last > 0) {
            let prevMax = nextMax;
            nextMax = Math.floor(this.doRead(last).value);
            for(let i = last - 1; i >= 0; i--) {
                let e = Math.floor(this.doRead(i).value);
                if(this.doValueCompare(e, nextMax)) {
                    if(e == prevMax) {
                        this.doSwap(i, last);
                        last--;
                    } else {
                        nextMax = e;
                    }
                }
                yield;
            }

            while(last > 0 && nextMax == Math.floor(this.doRead(last).value))
                last--;
        }
    }
}