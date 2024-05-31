class RadixLSDSort extends Sorter {
    constructor(opts) {
        super();

        this.name = "Radix Sort (LSD)";
        this.base = opts.base || 2;
    }

    specificInfo() {
        return [
            this.name,
            `Base ${this.base}`
        ];
    }
    
    * sort() {
        let max = -Infinity;
        for(let i = 0; i < this.arr.length; i++) {
            let e = this.doRead(i).value;
            if(e > max) max = e;
            yield;
        }
        let maxExp = Math.floor(Math.log(max) / Math.log(this.base));
        let exponent = 0

        while(exponent <= maxExp) {
            let count = new Array(this.base).fill(0);
            let aux = [];

            for(let i = 0; i < this.arr.length; i++) {
                let e = this.doRead(i);
                let digit = Math.floor((e.value % Math.pow(this.base, exponent+1)) / Math.pow(this.base, exponent));
                count[digit]++;
                aux.push(e);
                yield;
            }

            let pointers = [];
            let total = 0;
            for(let i = 0; i < count.length; i++) {
                pointers.push(total);
                total += count[i];
            }

            for(let i = 0; i < aux.length; i++) {
                let e = aux[i];
                let digit = Math.floor((e.value % Math.pow(this.base, exponent+1)) / Math.pow(this.base, exponent));
                this.doWrite(pointers[digit], e);
                pointers[digit]++;
                yield;
            }

            exponent++;
        }
    }
}