class ByLinesVisualizer extends Visualizer {
    constructor(img) {
        super();

        this.original = img;
        this.img = img;
    }

    makeArray(n, func) {
        //function chooses a scaling factor such that it has the largest possible array that is
        //under the length given, to a max of the number of pixels in the original image
        let scl = Math.min(1, Math.sqrt(n / (this.original.width * this.original.height)));

        this.img = createGraphics(img.width*scl, img.height*scl);
        this.img.copy(
            this.original,
            0, 0, this.original.width, this.original.height,
            0, 0, this.img.width, this.img.height
        );

        this.img.loadPixels();
        this.arr = [];

        for(let i = 0; i < this.img.pixels.length / 4; i++) {
            let element = {
                index: i % this.img.width,
                r: this.img.pixels[i*4],
                g: this.img.pixels[i*4 + 1],
                b: this.img.pixels[i*4 + 2],
                a: this.img.pixels[i*4 + 3]
            };
            element.value = func(element, this.img.width, this.height);
            this.arr.push(element);
        }

        this.max = this.arr[0].value;
        this.min = this.arr[0].value;
        for(let i in this.arr) {
            if(this.arr[i].value > this.max) this.max = this.arr[i].value;
            if(this.arr[i].value < this.min) this.min = this.arr[i].value;
        }
    }

    useAlgorithm(alg) {
        this.algs = [];
        for(let i = 0; i < this.img.height; i++) {
            let algClone = Object.assign(Object.create(Object.getPrototypeOf(alg)), alg);

            let list = [];
            for(let j = 0; j < this.img.width; j++) {
                list.push(this.arr[i*this.img.width + j]);
            }
            algClone.useArray(list);

            this.algs.push(algClone);
        }

        this.alg = this.algs[0];
        this.done = false;
    }
    
    step(iters) {
        this.done = true;
        for(let i = 0; i < this.img.height; i++) {
            let done = this.algs[i].step(iters)
            if(done) this.algs[i].accessing.clear();
            else this.done = false;
        }

        if(this.done) {
            //copy lists back over to this.arr
            this.arr = []
            for(let i = 0; i < this.algs.length; i++) {
                for(let j = 0; j < this.algs[i].arr.length; j++) {
                    this.arr.push(this.algs[i].arr[j]);
                }
            }
        }
    }

    draw() {
        background(0);
        noStroke();

        for(let i = 0; i < this.img.height; i++) {
            for(let j = 0; j < this.img.width; j++) {
                this.img.pixels[i*this.img.width*4 + j*4] = this.algs[i].arr[j].r;
                this.img.pixels[i*this.img.width*4 + j*4 + 1] = this.algs[i].arr[j].g;
                this.img.pixels[i*this.img.width*4 + j*4 + 2] = this.algs[i].arr[j].b;
                this.img.pixels[i*this.img.width*4 + j*4 + 3] = this.algs[i].arr[j].a;
            }
        }
        this.img.updatePixels();

        let scl = Math.min(height/this.img.height, width/this.img.width);
        image(this.img, (width-scl*this.img.width)*3/4, (height-scl*this.img.height), this.img.width*scl, this.img.height*scl);
    }
}