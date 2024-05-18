let visCanvas;
let vis;
let arr;

//p5js setup function
function setup() {
    visCanvas = createCanvas(1000, 500);
    visCanvas.parent("visualizer-div");

    arr = Array.from(Array(1000).keys());

    vis = new BarVisualizer(arr);
    vis.useAlgorithm(new Shuffle());
}

//p5js draw function
function draw() {
    background(0);

    if(vis.started){
        vis.step(10);
    }
    if(vis.done) {
        vis.useAlgorithm(new MergeSort());
    }

    vis.draw();
}

function mousePressed() {
    vis.setup();
}