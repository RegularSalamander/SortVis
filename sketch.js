let visCanvas;
let vis;
let arr;

let algList;
let algIterator;
let waiting = false;

let speed = 0.1;
let timer = 0;

//p5js setup function
function setup() {
    visCanvas = createCanvas(1024, 512);
    visCanvas.parent("visualizer-div");

    arr = Array.from(Array(64).keys());

    vis = new RainbowBarVisualizer(arr);
    vis.useAlgorithm(new Shuffle());

    algList = [
        //bubble sorts
        {n: 64, speed: 1, alg: new Shuffle()},
        {n: 64, speed: 2, alg: new BubbleSort()},
        {n: 64, speed: 1, alg: new Shuffle()},
        {n: 64, speed: 2, alg: new CocktailSort()},

        //insertion sorts
        {n: 64, speed: 2, alg: new Shuffle()},
        {n: 64, speed: 2, alg: new InsertionSort()},
        {n: 64, speed: 1, alg: new Shuffle()},
        {n: 64, speed: 2, alg: new GnomeSort()},

        //selection sorts
        {n: 64, speed: 1, alg: new Shuffle()},
        {n: 64, speed: 2, alg: new SelectionSort()},
        {n: 256, speed: 4, alg: new Shuffle()},
        {n: 256, speed: 2, alg: new HeapSort()},
        
        //quicksorts
        {n: 256, speed: 4, alg: new Shuffle()},
        {n: 256, speed: 2, alg: new QuickSort()},

        //mergesorts
        {n: 256, speed: 4, alg: new Shuffle()},
        {n: 256, speed: 2, alg: new MergeSort()}
    ]
    algIterator = algSeries(algList);

    algIterator.next()
}

//p5js draw function
function draw() {
    background(0);

    if(vis.started) {
        timer += speed;
        if(timer >= 1){
        vis.step(Math.floor(timer));
            timer -= Math.floor(timer);
    }
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
    vis.alg.writeInfo();
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