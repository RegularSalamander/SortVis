class Visualizer {
    constructor(arr) {
        this.arr = arr;
        this.alg = null;

        this.max = Math.max(...this.arr);
    }

    useAlgorithm(alg) {
        this.alg = alg;
        this.alg.useList(this.arr);
    }

    step(iters) {
        this.alg.step(iters)
    }

    draw() {
        //to be implemented by subclasses

        background(0);
        fill(255);
        stroke(0);
        text("No visualizer selected", 5, 20);
    }
}