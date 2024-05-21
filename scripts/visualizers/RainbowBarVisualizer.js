class RainbowBarVisualizer extends SoundVisualizer {
    draw() {
        background(0);
        noStroke();

        colorMode(HSB, 255, 255, 255);
        for(let i = 0; i < this.arr.length; i++) {
            if(flashing && this.alg.accessing.has(i)) fill(this.arr[i].value/this.max*255, 128, 255);
            else fill(this.arr[i].value/this.max*255, 255, 255);
            rect(
                Math.floor(i*width/this.arr.length),
                height*(1-this.arr[i].value/this.max),
                Math.ceil(width/this.arr.length),
                height*this.arr[i].value/this.max
            );
        }
        colorMode(RGB, 255, 255, 255);
    }
}