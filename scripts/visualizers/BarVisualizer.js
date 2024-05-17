class BarVisualizer extends Visualizer {
    draw() {
        background(0);
        noStroke();
        for(let i = 0; i < this.arr.length; i++) {
            if(this.alg.accessing.indexOf(i) >= 0) fill(255, 0, 0);
            else fill(255);
            rect(i*width/this.arr.length, height*(1-this.arr[i]/this.max), width/this.arr.length, height*this.arr[i]/this.max);
        }
    }
}