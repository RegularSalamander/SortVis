class NetworkSorter extends Sorter {
    constructor(opts) {
        super();

        if(!opts) opts = {};
        this.concurrent = opts.concurrent || false;

        this.name = "(Empty Sorting Network)";

        //network contains an array of concurrent steps,
        //each of which is an array of swaps in the form [idx1, idx2, bool]
        //where the bool indicates if the arrow of the swap points down
        this.network = [];
    }

    specificInfo() {
        return [
            this.name,
            `Concurrent: ${this.concurrent ? "Yes" : "No"}`
        ];
    }
    
    * sort() {
        //iterate over concurrent steps
        for(let i = 0; i < this.network.length; i++) {
            //iterate through arrows in the network
            for(let j = 0; j < this.network[i].length; j++) {
                //if within array bounds
                if(
                    this.network[i][j][0] >= 0 && this.network[i][j][0] < this.arr.length
                    &&
                    this.network[i][j][1] >= 0 && this.network[i][j][1] < this.arr.length
                ) {
                    if(this.network[i][j][2] == this.doCompare(this.network[i][j][0], this.network[i][j][1])) {
                        this.doSwap(this.network[i][j][0], this.network[i][j][1])
                    }

                    if(!this.concurrent)
                        yield;
                }
            }
            if(this.concurrent)
                yield;
        }
    }
}