class CombSort extends Sorter {
    constructor(opts) {
        super();

        if(!opts) opts = {};
        this.shrink = opts.shrink || 1.3;

        this.name = `Comb Sort`;
    }

    writeInfo() {
        this.drawInfoList([
            this.name || "(No algorithm)",
            `Shrink factor: ${this.shrink}`,
            null,
            `N = ${this.nf(this.arr.length)}`,
            null,
            `Comparisons: ${this.nf(this.compares)}`,
            `Reads: ${this.nf(this.reads)}`,
            `Writes: ${this.nf(this.writes)}`,
            `Swaps: ${this.nf(this.swaps)}`
        ]);
    }

    * sort() {
        let swapped = true;
        let gap = this.arr.length - 1;

        while(gap > 1 || swapped) {
            gap = Math.max(Math.floor(gap/this.shrink), 1);

            // "rule of 11"
            //if(gap == 9 || gap == 10) gap = 11;

            swapped = false;
            for(let i = 0; i + gap < this.arr.length; i += 1) {
                if(this.doCompare(i, i+gap)) {
                    this.doSwap(i, i+gap);
                    swapped = true;
                }
                yield;
            }


        }
    }
}