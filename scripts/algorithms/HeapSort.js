class HeapSort extends Sorter {
    * sort() {
        yield* this.heapify();

        let end = this.arr.length;
        while(end > 1) {
            end--;
            this.doSwap(end, 0);
            yield;
            yield* this.siftDown(0, end);
        }
    }

    iParent(i) { return Math.floor((i-1) / 2) }
    iLeftChild(i) { return 2*i + 1 }
    iRightChild(i) { return 2*i + 2 }

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
            if(child+1 < end && this.arr[child] < this.arr[child+1]) {
                child++;
            }

            if(this.arr[root] < this.arr[child]) {
                this.doSwap(root, child);
                yield;
                root = child;
            } else return;
        }
    }
}