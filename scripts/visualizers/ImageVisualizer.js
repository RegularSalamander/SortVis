class ImageVisualizer extends SoundVisualizer {
    constructor(img, scl) {
        super();

        this.img = createGraphics(img.width*scl, img.height*scl);
        this.img.copy(img, 0, 0, img.width, img.height, 0, 0, this.img.width, this.img.height);

        this.img.loadPixels();
        this.arr = Array.from(Array(this.img.pixels.length/4).keys());
        this.max = this.img.width*this.img.height;

        console.log(this.img.pixels.length/4);

        //pixelLookup as a copy of the original pixels array
        this.pixelLookup = [];
        for(let i in this.img.pixels) {
            this.pixelLookup.push(this.img.pixels[i]);
        }

        console.log(this.pixelLookup.length)
    }

    useList() {
        //do nothing when array is passed
        //actual array must be strictly [1...N] where N is the number of pixels in the image
    }

    draw() {
        background(0);
        noStroke();

        for(let i in this.arr) {
            if(this.alg.accessing.has(parseInt(i))) {
                this.img.pixels[i*4] = 255;
                this.img.pixels[i*4 + 1] = 255;
                this.img.pixels[i*4 + 2] = 255;
                this.img.pixels[i*4 + 3] = 255;
            } else {
                this.img.pixels[i*4] = this.pixelLookup[this.arr[i]*4];
                this.img.pixels[i*4 + 1] = this.pixelLookup[this.arr[i]*4 + 1];
                this.img.pixels[i*4 + 2] = this.pixelLookup[this.arr[i]*4 + 2];
                this.img.pixels[i*4 + 3] = this.pixelLookup[this.arr[i]*4 + 3];
            }
        }
        this.img.updatePixels();

        let scl = Math.min(height/this.img.height, width/this.img.width);
        image(this.img, (width-scl*this.img.width)/2, (height-scl*this.img.height), this.img.width*scl, this.img.height*scl);
    }
}