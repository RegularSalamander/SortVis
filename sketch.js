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

    arr = Array.from(Array(256).keys());

    vis = new ScatterVisualizer();
    vis.useList(arr);
    vis.useAlgorithm(new Shuffle());

    algList = [
        //bubble sorts
        {n: 256, speed: 2, alg: new Shuffle()},
        {n: 256, speed: 16, alg: new BubbleSort()},
        {n: 256, speed: 2, alg: new Shuffle()},
        {n: 256, speed: 16, alg: new CocktailSort()},
        {n: 256, speed: 2, alg: new Shuffle()},
        {n: 256, speed: 16, alg: new OddEvenSort()},
        {n: 2048, speed: 16, alg: new Shuffle()},
        {n: 2048, speed: 16, alg: new CombSort({shrink: 1.3})},

        //insertion sorts
        {n: 256, speed: 2, alg: new Shuffle()},
        {n: 256, speed: 16, alg: new InsertionSort()},
        {n: 256, speed: 2, alg: new Shuffle()},
        {n: 256, speed: 16, alg: new GnomeSort()},
        {n: 2048, speed: 16, alg: new Shuffle()},
        {n: 2048, speed: 16, alg: new ShellSort({shrink: 2.5})},

        //selection sorts
        {n: 256, speed: 2, alg: new Shuffle()},
        {n: 256, speed: 16, alg: new SelectionSort()},
        {n: 256, speed: 2, alg: new Shuffle()},
        {n: 256, speed: 16, alg: new DoubleSelectionSort()},
        {n: 2048, speed: 16, alg: new Shuffle()},
        {n: 2048, speed: 16, alg: new HeapSort()},
        
        //quicksorts
        {n: 2048, speed: 16, alg: new Shuffle()},
        {n: 2048, speed: 16, alg: new QuickSort({partitionType:"LR"})},
        {n: 2048, speed: 16, alg: new Shuffle()},
        {n: 2048, speed: 16, alg: new QuickSort({partitionType:"LL"})},

        //mergesorts
        {n: 2048, speed: 16, alg: new Shuffle()},
        {n: 2048, speed: 16, alg: new MergeSort()}
    ]
    algIterator = algSeries(algList);

    algIterator.next()
}

//p5js draw function
function draw() {
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

    if(frameCount % 60 == 0)
        console.log(frameRate())
}

function mousePressed() {
    vis.setup();
}

function* algSeries(list) {
    for(let i in list) {
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