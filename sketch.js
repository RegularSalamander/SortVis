let visCanvas;
let vis;
let arr;

let algList;
let speed = 1;
let algIterator;
let waiting = false;

//p5js setup function
function setup() {
    visCanvas = createCanvas(1024, 512);
    visCanvas.parent("visualizer-div");

    arr = Array.from(Array(64).keys());

    vis = new RainbowBarVisualizer(arr);
    vis.useAlgorithm(new Shuffle());

    algList = [
        // {n: 64, speed: 1, alg: new Shuffle()},
        // {n: 64, speed: 2, alg: new BubbleSort()},
        // {n: 64, speed: 1, alg: new Shuffle()},
        // {n: 64, speed: 2, alg: new GnomeSort()},
        // {n: 128, speed: 2, alg: new Shuffle()},
        // {n: 128, speed: 2, alg: new InsertionSort()},
        // {n: 256, speed: 4, alg: new Shuffle()},
        // {n: 256, speed: 2, alg: new QuickSort()},
        // {n: 256, speed: 4, alg: new Shuffle()},
        // {n: 256, speed: 2, alg: new MergeSort()},
        // {n: 256, speed: 4, alg: new Shuffle()},
        // {n: 256, speed: 2, alg: new HeapSort()}
        {n: 64, speed: 1, alg: new Shuffle()},
        {n: 64, speed: 2, alg: new SelectionSort()}
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
    vis.alg.writeDetails();
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