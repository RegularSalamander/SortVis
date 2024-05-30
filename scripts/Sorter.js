class Sorter {
    constructor() {
        this.reads = 0
        this.writes = 0;
        this.compares = 0;
        this.swaps = 0;

        this.accessing = new Set();
        this.values = [];

        this.arr = null;

        let nf = new Intl.NumberFormat();
        this.nf = nf.format;
    }

    useArray(arr) {
        this.arr = arr;
    }

    step(iters) {
        if(!this.iterator) {
            this.iterator = this.sort();
        }
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
        this.values.push(this.arr[idx1].value, this.arr[idx2].value);
        this.compares++;
        this.reads += 2;

        return this.arr[idx1].value > this.arr[idx2].value;
    }

    doValueCompare(val1, val2) {
        this.values.push(val1, val2);
        this.compares++;

        return val1 > val2;
    }

    doSwap(idx1, idx2) {
        this.accessing.add(idx1);
        this.accessing.add(idx2);
        this.values.push(this.arr[idx1].value, this.arr[idx2].value);
        this.reads += 2;
        this.writes += 2;
        this.swaps++;

        let temp = this.arr[idx1];
        this.arr[idx1] = this.arr[idx2];
        this.arr[idx2] = temp;
    }

    doRead(idx) {
        this.accessing.add(idx);
        this.values.push(this.arr[idx].value);
        this.reads++;

        return this.arr[idx];
    }

    doWrite(idx, obj) {
        this.accessing.add(idx);
        this.values.push(obj.value);
        this.writes++;

        this.arr[idx] = obj;
    }

    * sort() {
        //to be implemented by subclasses
    }

    writeInfo() {
        this.drawInfoList([
            this.name || `(No algorithm)`,
            null,
            `N = ${this.nf(this.arr.length)}`,
            null,
            `Comparisons: ${this.nf(this.compares)}`,
            `Reads: ${this.nf(this.reads)}`,
            `Writes: ${this.nf(this.writes)}`,
            `Swaps: ${this.nf(this.swaps)}`
        ]);
    }

    /*
    Takes in a list of strings and writes each one to the screen as one line.
    null values are treated as small gaps between lines.
    */
    drawInfoList(list) {
        fill(255);
        noStroke();
        textSize(32);
        let y = 50;
        for(let i in list) {
            if(list[i]) {
                text(list[i], 20, y);
                y += 35;
            } else {
                y += 20;
            }
        }
    }
}