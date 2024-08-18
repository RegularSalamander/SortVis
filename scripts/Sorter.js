class Sorter {
    constructor() {
        this.reads = 0
        this.writes = 0;
        this.compares = 0;
        this.swaps = 0;

        this.accessing = new Set();
        this.values = [];

        this.visualStartTime;
        this.visualTime = 0;
        this.sortTime = 0;

        this.arr = null;

        let nf = new Intl.NumberFormat();
        this.nf = nf.format;
    }

    useArray(arr) {
        this.arr = arr;
    }

    step(iters) {
        if(!this.visualStartTime) this.visualStartTime = performance.now();

        if(!this.iterator) {
            this.iterator = this.sort();
        }

        this.accessing.clear();
        this.values = [];

        for(let i = 0; i < iters; i++) {
            let startTime = performance.now();
            let done = this.iterator.next().done;
            this.sortTime += performance.now() - startTime;
            this.visualTime = performance.now() - this.visualStartTime;
            if(done) return true;
        }
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
        let info = [
            null,
            `N = ${this.nf(this.arr.length)}`,
            null,
            `Comparisons: ${this.nf(this.compares)}`,
            `Reads: ${this.nf(this.reads)}`,
            `Writes: ${this.nf(this.writes)}`,
            `Swaps: ${this.nf(this.swaps)}`,
            null,
            `Visual Time: ${this.nf(this.visualTime/1000)} s`,
            `Sort Time: ${this.nf(this.sortTime)} ms`
        ]
        if(this.specificInfo) {
            this.drawInfoList(...this.specificInfo(), ...info);
        } else {
            this.drawInfoList(this.name || `(No algorithm)`, ...info);
        }
    }

    /*
    Takes in a list of strings and writes each one to the screen as one line.
    null values are treated as small gaps between lines.
    */
    drawInfoList() {
        let str = "";

        for(let i in arguments) {
            if(arguments[i]) {
                str += `<p>${arguments[i]}</p>`;
            } else {
                str += "<hr />"
            }
        }

        document.getElementById("sorter-info").innerHTML = str;
    }
}