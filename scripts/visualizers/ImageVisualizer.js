class ImageVisualizer extends SoundVisualizer {
    constructor(img, scl) {
        super();

        this.original = img;
        this.img = img;
    }

    useList(arr) {
        //function chooses a scaling factor such that it has the largest possible array that is
        //under the length of the passed array
        let scl = Math.min(1, Math.sqrt(arr.length / (this.original.width * this.original.height)));

        this.img = createGraphics(img.width*scl, img.height*scl);
        this.img.copy(
            this.original,
            0, 0, this.original.width, this.original.height,
            0, 0, this.img.width, this.img.height
        );

        this.img.loadPixels();
        this.arr = Array.from(Array(this.img.pixels.length/4).keys());
        this.max = this.img.width*this.img.height;

        console.log(this.img.pixels.length/4);

        //pixelLookup as a copy of the original pixels array
        this.pixelLookup = [];
        for(let i in this.img.pixels) {
            this.pixelLookup.push(this.img.pixels[i]);
        }
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