class Sorter {
    constructor() {
        this.reads = 0
        this.writes = 0;
        this.compares = 0;
        this.swaps = 0;

        this.accessing = new Set();
        this.values = [];

        this.arr = null;

        this.iterator = this.sort();
    }

    useList(arr) {
        this.arr = arr;
    }

    step(iters) {
        this.accessing.clear();
        this.values = [];
        for(let i = 0; i < iters; i++)
            if(this.iterator.next().done)
                return true;
        return false;
    }

    doCompare(idx1, idx2) {
        this.accessing.add(idx1);
        this.accessing.add(idx2);
        this.values.push(this.arr[idx1], this.arr[idx2]);
        this.compares++;
        this.reads += 2;

        return this.arr[idx1] > this.arr[idx2];
    }

    doSwap(idx1, idx2) {
        this.accessing.add(idx1);
        this.accessing.add(idx2);
        this.values.push(this.arr[idx1], this.arr[idx2]);
        this.reads += 2;
        this.writes += 2;
        this.swaps++;

        let temp = this.arr[idx1];
        this.arr[idx1] = this.arr[idx2];
        this.arr[idx2] = temp;
    }

    doRead(idx) {
        this.accessing.add(idx);
        this.values.push(this.arr[idx]);
        this.reads++;

        return this.arr[idx];
    }

    doWrite(idx, val) {
        this.accessing.add(idx);
        this.values.push(val);
        this.writes++;

        this.arr[idx] = val;
    }

    * sort() {
        //to be implemented by subclasses
    }

    writeInfo() {
        this.drawInfoList([
            this.name || `(No algorithm)`,
            null,
            `N = ` + this.arr.length,
            null,
            `Comparisons: ${this.compares}`,
            `Reads: ${this.reads}`,
            `Writes: ${this.writes}`,
            `Swaps: ${this.swaps}`
        ]);
    }

    /*
    Takes in a list of strings and writes each one to the screen as one line.
    null values are treated as small gaps between lines.
    */
    drawInfoList(list) {
        fill(255);
        noStroke();
        let y = 25;
        for(let i in list) {
            if(list[i]) {
                text(list[i], 10, y);
                y += 15;
            } else {
                y += 10;
            }
        }
    }
}