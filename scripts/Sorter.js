class Sorter {
    constructor() {
        this.reads = 0
        this.writes = 0;
        this.compares = 0;
        this.swaps = 0;

        this.accessing = [];
        this.values = [];

        this.arr = null;

        this.iterator = this.sort();
    }

    useList(arr) {
        this.arr = arr;
    }

    step(iters) {
        this.accessing = [];
        this.values = [];
        for(let i = 0; i < iters; i++)
            if(this.iterator.next().done)
                return true;
        return false;
    }

    doCompare(idx1, idx2) {
        this.accessing.push(idx1, idx2);
        this.values.push(arr[idx1], arr[idx2]);
        this.compares++;
        this.reads += 2;

        return this.arr[idx1] > this.arr[idx2];
    }

    doSwap(idx1, idx2) {
        this.accessing.push(idx1, idx2);
        this.values.push(this.arr[idx1], this.arr[idx2]);
        this.reads += 2;
        this.writes += 2;
        this.swaps++;

        let temp = this.arr[idx1];
        this.arr[idx1] = this.arr[idx2];
        this.arr[idx2] = temp;
    }

    doRead(idx) {
        this.accessing.push(idx);
        this.values.push(this.arr[idx]);
        this.reads++;

        return this.arr[idx];
    }

    doWrite(idx, val) {
        this.accessing.push(idx);
        this.values.push(val);
        this.writes++;

        this.arr[idx] = val;
    }

    * sort() {
        //to be implemented by subclasses
    }

    writeDetails() {
        fill(255);
        noStroke();
        text(this.name || "(No algorithm)", 10, 25)
        text("N = " + this.arr.length, 10, 50)
        text("Comparisons: " + this.compares, 10, 75)
        text("Reads: " + this.reads, 10, 90)
        text("Writes: " + this.writes, 10, 105)
        text("Swaps: " + this.swaps, 10, 120)
    }
}