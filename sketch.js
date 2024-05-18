let visCanvas;
let vis;
let arr;

let algList;
let speed = 1;
let algIterator;
let waiting = false;

//p5js setup function
function setup() {
    visCanvas = createCanvas(1000, 500);
    visCanvas.parent("visualizer-div");

    arr = Array.from(Array(1000).keys());

    vis = new BarVisualizer(arr);
    vis.useAlgorithm(new Shuffle());

    algList = [
        {n: 50, speed: 1, alg: new Shuffle()},
        {n: 50, speed: 1, alg: new BubbleSort()},
        {n: 100, speed: 2, alg: new Shuffle()},
        {n: 100, speed: 1, alg: new InsertionSort()},
        {n: 200, speed: 4, alg: new Shuffle()},
        {n: 200, speed: 1, alg: new QuickSort()},
        {n: 200, speed: 4, alg: new Shuffle()},
        {n: 200, speed: 1, alg: new MergeSort()}
    ]
    algIterator = algSeries(algList);

    algIterator.next()
}

//p5js draw function
function draw() {
    background(0);

    if(vis.started){
        vis.step(speed);
    }
    if(vis.done && !waiting) {
        setTimeout(
            () => {
                algIterator.next();
                waiting = false;
            },
            1000
        )

        waiting = true;
    }

    vis.draw();
}

function mousePressed() {
    vis.setup();
}

function* algSeries(list) {
    for(let i in list) {
        console.log(i);
        if(list[i].n != vis.arr.length) {
            arr = Array.from(Array(list[i].n).keys());
            vis.useList(arr);
            vis.done = true;
            yield;
        }
        vis.useAlgorithm(list[i].alg);
        speed = list[i].speed;
        yield;
    }
}