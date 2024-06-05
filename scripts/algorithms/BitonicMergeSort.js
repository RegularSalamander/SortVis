class BitonicMergeSort extends NetworkSorter {
    constructor(opts) {
        super(opts);

        this.name = "Bitonic Merge Sort";
    }

    useArray(arr) {
        this.arr = arr;

        //lowest power of two >= arr.length
        let extendedLen = Math.pow(2, Math.ceil(Math.log2(this.arr.length)));

        //h = size of big color grouping
        for(let h = 2; h <= extendedLen; h *= 2) {
            //i = size of the red grouping
            for(let i = h; i >= 2; i /= 2) {
                this.network.push([]);
                let dir = false;
                //j = start of the big grouping we're in
                for(let j = 0; j < extendedLen; j += h) {
                    dir = !dir;
                    //k = start of the red grouping we're in
                    for(let k = j; k < j + h; k += i) {
                        //l = idx within the red grouping
                        for(let l = 0; l < i/2; l++) {
                            this.network[this.network.length-1].push([k+l, k+l+i/2, dir]);
                        }
                    }
                }
            }
        }
    }
}