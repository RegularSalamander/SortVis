class CocktailSort extends Sorter {
    constructor() {
        super();

        this.name = "Cocktail Sort";
    }

    * sort() {
        let swapped = true;
        let end = this.arr.length - 1;
        let start = 0;
        while(end > start && swapped) {
            swapped = false;
            for(let i = start; i < end; i++) {
                if(this.doCompare(i, i+1)) {
                    this.doSwap(i, i+1);
                    swapped = true;
                }
                yield;
            }

            if(!swapped) break;

            swapped = false;
            for(let i = end - 2; i >= start; i--) {
                if(this.doCompare(i, i+1)) {
                    this.doSwap(i, i+1);
                    swapped = true;
                }
                yield;
            }

            end--;
            start++;
        }
    }
}