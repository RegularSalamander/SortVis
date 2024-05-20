p5.disableFriendlyErrors = true;

let visCanvas;
let img;

let speed = 0.1;
let timer = 0;
let waiting = false;

let imgAddress;
let flashing = false;
let fullSound = false;
let algIterator;
let vis;

function preload() {
    //load image, default to Lena if no address is specified
    img = loadImage(imgAddress || "https://upload.wikimedia.org/wikipedia/en/7/7d/Lenna_%28test_image%29.png");
}

//p5js setup function
function setup() {
    visCanvas = createCanvas(1920, 1080);
    visCanvas.parent("visualizer-div");

    loadSequence();

    algIterator.next();
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
            vis.useList(Array.from(Array(list[i].n).keys()));
            vis.done = true;
            if(i > 0) yield;
        }
        vis.useAlgorithm(list[i].alg);
        speed = list[i].speed;
        yield;
    }
}