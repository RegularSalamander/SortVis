class RainbowBarVisualizer extends SoundVisualizer {
    draw() {
        background(0);
        noStroke();

        colorMode(HSB, 255, 255, 255);
        for(let i = 0; i < this.arr.length; i++) {
            if(this.alg.accessing.indexOf(i) >= 0) fill(0, 0, 255);
            else fill(this.arr[i]/this.max*255, 255, 255);
            rect(i*width/this.arr.length, height*(1-this.arr[i]/this.max), width/this.arr.length, height*this.arr[i]/this.max);
        }
        colorMode(RGB, 255, 255, 255);
    }
}