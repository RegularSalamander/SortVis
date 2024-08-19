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
    visCanvas = createCanvas();
    visCanvas.parent("visualizer-div");
    visCanvas.id("visualizer-canvas");

    setupVis()
}

let totalTime = 0;

//p5js draw function
function draw() {
    resizeCanvas(
        document.getElementById("visualizer-div").offsetWidth,
        document.getElementById("visualizer-div").offsetHeight
    );

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
}

const idxFunc = (a) => a.index;
const luminanceFunc = (a) => - ((0.2126*a.r + 0.7152*a.g + 0.0722*a.b)*50 + Math.random());

function applyImage() {
    document.getElementById("option-visualizer-type").value = "ImageVisualizer";

    let image = document.getElementById("option-image").files[0];
    let url = window.URL.createObjectURL(image);
    img = loadImage(url, () => {
        setupVis();
        window.URL.revokeObjectURL(url);
    });
}

function setupVis() {
    if(vis)
        vis.stopSound();

    //visualizer selection
    let type = document.getElementById("option-visualizer-type").value;
    if(type == "BarVisualizer") vis = new BarVisualizer();
    else if(type == "RainbowBarVisualizer") vis = new RainbowBarVisualizer();
    else if(type == "GradientBarVisualizer") vis = new GradientBarVisualizer([255, 50, 50], [255, 255, 50], [50, 255, 50]);
    else if(type == "RainbowCircleVisualizer") vis = new RainbowCircleVisualizer();
    else if(type == "ScatterVisualizer") vis = new ScatterVisualizer();
    else if(type == "ImageVisualizer") vis = new ImageVisualizer(img, 1);

    //array size
    let n = document.getElementById("option-array-size").value;
    if(type == "ImageVisualizer") vis.makeArray(n, luminanceFunc); //sort images by luminance
    else vis.makeArray(n, idxFunc); //sort other arrays by index

    vis.useAlgorithm(new Shuffle())

    fullSound = n < 10000; //disable full sound on large arrays

    updateVis();
}

function updateVis() {
    speed = document.getElementById("option-speed").value;

    flashing = document.getElementById("option-flashing").checked;
}

function startSort() {
    vis.useAlgorithm(new MergeSort());
    vis.setup();
}

function doShuffle() {
    vis.useAlgorithm(new Shuffle());
    vis.setup();
}