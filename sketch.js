let visCanvas;
let vis;
let arr;

//p5js setup function
function setup() {
    visCanvas = createCanvas(1000, 500);
    visCanvas.parent("visualizer-div");

    arr = Array.from(Array(100).keys());

    vis = new BarVisualizer(arr);
    vis.useAlgorithm(new Shuffle());
}

//p5js draw function
function draw() {
    background(0);

    vis.step(1);
    if(vis.done) {
        vis.useAlgorithm(new QuickSort());
    }

    vis.draw();
}