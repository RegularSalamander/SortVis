class RadixMSDSort extends Sorter {
    constructor(opts) {
        super();

        this.name = "Radix Sort (MSD)";
        this.base = opts.base || 2;
    }

    specificInfo() {
        return [
            this.name,
            `Base ${this.base}`
        ];
    }
    
    * sort() {
        console.log(this.arr.length);

        let max = -Infinity;
        for(let i = 0; i < this.arr.length; i++) {
            let e = this.doRead(i).value;
            if(e > max) max = e;
            yield;
        }
        let maxExp = Math.floor(Math.log(max) / Math.log(this.base));
        
        yield* this.recurse(maxExp, 0, this.arr.length);
    }

    * recurse(exponent, start, end) {
        if(end - start <= 1) return;

        let count = new Array(this.base).fill(0);
        let aux = [];

        for(let i = start; i < end; i++) {
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
            this.doWrite(start + pointers[digit], e);
            pointers[digit]++;
            yield;
        }

        total = 0;
        for(let i = 0; i < count.length; i++) {
            yield* this.recurse(exponent-1, start + total, start + total+count[i]);
            total += count[i];
        }
    }
}