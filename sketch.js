p5.disableFriendlyErrors = true;

let visCanvas;
let vis;
let arr;

let algIterator;
let waiting = false;

let speed = 0.1;
let timer = 0;

let img;

function preload() {
    // img = loadImage("https://upload.wikimedia.org/wikipedia/en/7/7d/Lenna_%28test_image%29.png");
    img = loadImage("https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png")
}

//p5js setup function
function setup() {
    visCanvas = createCanvas(1024, 512);
    visCanvas.parent("visualizer-div");

    arr = Array.from(Array(256).keys());

    vis = new ImageVisualizer(img, 1);
    vis.useList(arr);
    vis.useAlgorithm(new Shuffle());

    algIterator = algSeries([
        //bubble sorts
        {n: Math.pow(2, 11), speed: 100, alg: new Shuffle()},
        {n: Math.pow(2, 11), speed: 500, alg: new BubbleSort()},
        {n: Math.pow(2, 11), speed: 100, alg: new Shuffle()},
        {n: Math.pow(2, 11), speed: 500, alg: new CocktailSort()},
        {n: Math.pow(2, 11), speed: 100, alg: new Shuffle()},
        {n: Math.pow(2, 11), speed: 500, alg: new OddEvenSort()},
        {n: Math.pow(2, 12), speed: 100, alg: new Shuffle()},
        {n: Math.pow(2, 12), speed: 500, alg: new CombSort({shrink: 1.3})},

        //insertion sorts
        {n: Math.pow(2, 12), speed: 100, alg: new Shuffle()},
        {n: Math.pow(2, 12), speed: 500, alg: new InsertionSort()},
        {n: Math.pow(2, 11), speed: 50, alg: new Shuffle()},
        {n: Math.pow(2, 11), speed: 1000, alg: new GnomeSort()},
        {n: Math.pow(2, 17), speed: 1000, alg: new Shuffle()},
        {n: Math.pow(2, 17), speed: 1000, alg: new ShellSort({shrink: 2.5})},

        //selection sorts
        {n: Math.pow(2, 11), speed: 100, alg: new Shuffle()},
        {n: Math.pow(2, 11), speed: 1000, alg: new SelectionSort()},
        {n: Math.pow(2, 11), speed: 100, alg: new Shuffle()},
        {n: Math.pow(2, 11), speed: 1000, alg: new DoubleSelectionSort()},
        {n: Math.pow(2, 17), speed: 1000, alg: new Shuffle()},
        {n: Math.pow(2, 17), speed: 1000, alg: new HeapSort()},
        
        //quicksorts
        {n: Math.pow(2, 17), speed: 1000, alg: new Shuffle()},
        {n: Math.pow(2, 17), speed: 1000, alg: new QuickSort({partitionType:"LR"})},
        {n: Math.pow(2, 17), speed: 1000, alg: new Shuffle()},
        {n: Math.pow(2, 17), speed: 1000, alg: new QuickSort({partitionType:"LL"})},

        //mergesorts
        {n: Math.pow(2, 17), speed: 1000, alg: new Shuffle()},
        {n: Math.pow(2, 17), speed: 1000, alg: new MergeSort()},
        {n: Math.pow(2, 17), speed: 1000, alg: new Shuffle()},
        {n: Math.pow(2, 17), speed: 1000, alg: new IterativeMergeSort()},
    ]);

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
        if(i == 0 || list[i].n != list[i-1].n) {
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