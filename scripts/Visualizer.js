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

    makeArray(n, func) {
        this.arr = [];

        for(let i = 0; i < n; i++) {
            let element = { index: i };
            element.value = func(element);
            this.arr.push(element);
        }

        this.max = this.arr[0].value;
        this.min = this.arr[0].value;
        for(let i in this.arr) {
            if(this.arr[i].value > this.max) this.max = this.arr[i].value;
            if(this.arr[i].value < this.min) this.min = this.arr[i].value;
        }

        if(this.min < 0) {
            for(let i = 0; i < this.arr.length; i++) {
                this.arr[i].value += -this.min;
            }
            this.max += -this.min;
            this.min = 0;
        }
    }

    useAlgorithm(alg) {
        this.alg = alg;
        this.alg.useArray(this.arr);

        this.done = false;
    }

    step(iters) {
        if(this.done) {
            this.alg.accessing.clear();
            return;
        }
        
        this.done = this.alg.step(iters)
        if(this.done) this.alg.accessing.clear();
    }

    draw() {
        //to be implemented by subclasses

        background(0);
        fill(255);
        stroke(0);
        text("No visualizer selected", 5, 20);
    }
}