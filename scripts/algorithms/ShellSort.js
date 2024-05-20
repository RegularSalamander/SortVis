class ShellSort extends Sorter {
    constructor(opts) {
        super();

        if(!opts) opts = {};
        this.shrink = opts.shrink || 2;

        this.name = `Shell Sort`;
    }
    
    writeInfo() {
        this.drawInfoList([
            this.name || "(No algorithm)",
            `Shrink factor: ${this.shrink}`,
            null,
            "N = " + this.arr.length,
            null,
            "Comparisons: " + this.compares,
            "Reads: " + this.reads,
            "Writes: " + this.writes,
            "Swaps: " + this.swaps
        ]);
    }

    * sort() {
        yield;

        let gap = this.arr.length - 1;

        while(gap > 1) {
            gap = Math.max(Math.floor(gap/this.shrink), 1);

            for(let i = gap; i < this.arr.length; i++) {
                let j = i;
                while(j >= gap && this.doCompare(j-gap, j)) {
                    this.doSwap(j, j-gap);
                    j -= gap;
                    yield;
                }
                yield;
            }
        }
    }
}