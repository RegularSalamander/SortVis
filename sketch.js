let visCanvas;
let vis;
let arr;

//p5js setup function
function setup() {
    visCanvas = createCanvas(1000, 500);
    visCanvas.parent("visualizer-div");

    arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    vis = new BarVisualizer(arr);
}

//p5js draw function
function draw() {
    background(0);

    vis.draw();
}