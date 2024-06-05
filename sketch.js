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

let totalTime = 0;

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
        console.log("Total Time", totalTime += (vis.alg.visualTime)/1000 + 1)
        if(vis.alg.name != "Shuffling..." && (Math.abs(30000 - vis.alg.visualTime) > 5000 || true))
            console.log(vis.alg.name, vis.alg.visualTime/30000*speed)

        setTimeout(
            () => {
                if(algIterator.next())
                    waiting = false;
            },
            1000
        )

        waiting = true;
    }

    vis.draw();
    vis.alg.writeInfo();

    // fill(255);
    // noStroke(0);
    // textSize(16);
    // text(Math.floor(frameRate()), 10, 20);
}

function mousePressed() {
    vis.setup();
}

function* algSeries(func, list) {
    for(let i in list) {
        if(i == 0 || list[i].n != list[i-1].n) {
            vis.makeArray(list[i].n, func);
            vis.done = true;
            if(i > 0) yield;
        }
        vis.useAlgorithm(list[i].alg);
        speed = list[i].speed;

        
        yield;
    }
}