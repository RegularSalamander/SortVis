class BarVisualizer extends SoundVisualizer {
    draw() {
        background(0);
        noStroke();
        for(let i = 0; i < this.arr.length; i++) {
            if(flashing && this.alg.accessing.has(i)) fill(255, 128, 128);
            else fill(255);
            rect(
                Math.floor(i*width/this.arr.length),
                height*(1-this.arr[i].value/this.max),
                Math.ceil(width/this.arr.length),
                height*this.arr[i].value/this.max
            );
        }
    }
}