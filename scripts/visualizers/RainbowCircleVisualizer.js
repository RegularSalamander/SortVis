class RainbowCircleVisualizer extends SoundVisualizer {
    draw() {
        const diam = Math.min(width, height) * 0.9;

        background(0);
        noStroke();
        colorMode(HSB, 255, 255, 255);
        for(let i = 0; i < this.arr.length; i++) {
            if(flashing && this.alg.accessing.has(i)) fill(0, 0, 255);
            else {
                fill(this.arr[i]/this.max*255, 255, 255);
            }
            arc(
                width/2, height/2,
                diam, diam,
                (i-0.5)/this.arr.length*TWO_PI, (i+1.5)/this.arr.length*TWO_PI
            );
        }
        colorMode(RGB, 255, 255, 255);
    }
}