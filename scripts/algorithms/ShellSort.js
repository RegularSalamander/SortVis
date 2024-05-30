class ShellSort extends Sorter {
    constructor(opts) {
        super();

        if(!opts) opts = {};
        this.shrink = opts.shrink || 2;

        this.name = `Shell Sort`;
    }
    
    specificInfo() {
        return [
            this.name,
            `Shrink factor: ${this.shrink}`
        ];
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