class WeakHeapSort extends Sorter {
    constructor() {
        super();

        this.name = "Weak Heap Sort";
    }
    
    * sort() {
        this.reverseBits = new Array(this.arr.length).fill(0);

        yield* this.heapify();

        let end = this.arr.length;
        while(end > 1) {
            end--;
            this.doSwap(end, 0);
            yield;
            yield* this.siftDown(0, end);
        }
    }

    iParent(i) { return Math.floor((i) / 2) }
    iLeftChild(i) { return 2*i + this.reverseBits[i] }
    iRightChild(i) { return 2*i + 1 - this.reverseBits[i] }
    iDistinguishedParent(i) { this.reverseBits[this.iParent(i)] ? this.iParent(i) : this.iDistinguishedParent(this.iParent(i)) }

    * heapify() {
        let start = this.iParent(this.arr.length - 1) + 1

        while(start > 0) {
            start--;
            yield* this.siftDown(start, this.arr.length);
        }
    }

    * siftDown(root, end) {
        while(this.iLeftChild(root) < end) {
            let child = this.iLeftChild(root);
            if(child+1 < end && this.doCompare(child+1, child)) {
                child++;
            }

            if(this.doCompare(child, root)) {
                this.doSwap(root, child);
                yield;
                root = child;
            } else return;
        }
    }
}