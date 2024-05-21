class ImageVisualizer extends SoundVisualizer {
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
        n = this.img.pixels.length / 4;

        for(let i = 0; i < n; i++) {
            let element = { index: i };
            element.r = this.img.pixels[i*4];
            element.g = this.img.pixels[i*4 + 1];
            element.b = this.img.pixels[i*4 + 2];
            element.a = this.img.pixels[i*4 + 3];
            element.value = func(element);
            this.arr.push(element);
        }

        this.max = this.arr[0].value;
        this.min = this.arr[0].value;
        for(let i in this.arr) {
            if(this.arr[i].value > this.max) this.max = this.arr[i].value;
            if(this.arr[i].value < this.min) this.min = this.arr[i].value;
        }
    }

    draw() {
        background(0);
        noStroke();

        for(let i in this.arr) {
            if(flashing && this.alg.accessing.has(parseInt(i))) {
                this.img.pixels[i*4] = 255;
                this.img.pixels[i*4 + 1] = 255;
                this.img.pixels[i*4 + 2] = 255;
                this.img.pixels[i*4 + 3] = 255;
            } else {
                this.img.pixels[i*4] = this.arr[i].r;
                this.img.pixels[i*4 + 1] = this.arr[i].g;
                this.img.pixels[i*4 + 2] = this.arr[i].b;
                this.img.pixels[i*4 + 3] = this.arr[i].a;
            }
        }
        this.img.updatePixels();

        let scl = Math.min(height/this.img.height, width/this.img.width);
        image(this.img, (width-scl*this.img.width)*3/4, (height-scl*this.img.height), this.img.width*scl, this.img.height*scl);
    }
}