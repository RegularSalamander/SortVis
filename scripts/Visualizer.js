class Visualizer {
    constructor() {
        this.arr = null;
        this.alg = null;

        this.max = 0;
        this.done = false;

        this.started = false;
    }

    setup() {
        this.started = true;
    }

    useList(arr) {
        this.arr = arr;

        //exceeds maximum stack size with very large lists
        // this.max = Math.max(...this.arr);

        this.max = this.arr[0];
        for(let i in this.arr) {
            if(this.arr[i] > this.max) this.max = this.arr[i]
        }
    }

    useAlgorithm(alg) {
        this.alg = alg;
        this.alg.useList(this.arr);

        this.done = false;
    }

    step(iters) {
        if(this.done) return;
        
        this.done = this.alg.step(iters)
    }

    draw() {
        //to be implemented by subclasses

        background(0);
        fill(255);
        stroke(0);
        text("No visualizer selected", 5, 20);
    }
}