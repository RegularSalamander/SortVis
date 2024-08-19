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

        for(let i = 0; i < this.img.pixels.length / 4; i++) {
            let element = {
                index: i,
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

        if(this.min < 0) {
            for(let i = 0; i < this.arr.length; i++) {
                this.arr[i].value += -this.min;
            }
            this.max += -this.min;
            this.min = 0;
        }
    }

    draw() {
        background(0);
        noStroke();

        for(let i in this.arr) {
            if(flashing && this.alg.accessing.has(parseInt(i))) {
                this.img.pixels[i*4] = this.arr[i].r;
                this.img.pixels[i*4 + 1] = this.arr[i].g;
                this.img.pixels[i*4 + 2] = this.arr[i].b;
                this.img.pixels[i*4 + 3] = 225; //slightly transparent
            } else {
                this.img.pixels[i*4] = this.arr[i].r;
                this.img.pixels[i*4 + 1] = this.arr[i].g;
                this.img.pixels[i*4 + 2] = this.arr[i].b;
                this.img.pixels[i*4 + 3] = this.arr[i].a;
            }
        }
        this.img.updatePixels();

        let scl = Math.min(height/this.img.height, width/this.img.width);
        fill(255);
        rect((width-scl*this.img.width)/2, (height-scl*this.img.height), this.img.width*scl, this.img.height*scl);
        image(this.img, (width-scl*this.img.width)/2, (height-scl*this.img.height), this.img.width*scl, this.img.height*scl);
    }
}