class BarVisualizer extends Visualizer {
    draw() {
        background(0);
        fill(255);
        noStroke();
        for(let i = 0; i < this.arr.length; i++) {
            rect(i*width/this.arr.length, height*(1-this.arr[i]/this.max), width/this.arr.length, height*this.arr[i]/this.max);
        }
    }
}