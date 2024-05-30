// imgAddress = "https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png";
// imgAddress = "https://upload.wikimedia.org/wikipedia/commons/d/d1/PM5544_MK10.png"

const idxFunc = (a) => a.index;
const brightnessFunc = (a) => - (a.r + a.g + a.b + Math.random())
const luminanceFunc = (a) => - (0.2126*a.r + 0.7152*a.g + 0.0722*a.b + Math.random())
const hueFunc = (a) => {
    let R = (a.r) / 255;
    let G = (a.g) / 255;
    let B = (a.b) / 255;
    let max = Math.max(R, G, B);
    let spread = max - Math.min(R, G, B);
    if(spread == 0) return 0;
    if(max == R) return (G-B)/spread;
    if(max == G) return 2 + (B-R)/spread;
    return 4 + (R-G)/spread;
}

function loadSequence() {
    flashing = false;
    fullSound = false;

    // vis = new RainbowBarVisualizer();
    // vis = new ScatterVisualizer();
    // vis = new RainbowCircleVisualizer();
    vis = new ImageVisualizer(img, 1);

    // // for BarVisualizer or RainbowBarVisualizer
    // let listMult = 0;
    // let badAlgDiv = 0;
    // let speedCoef = 1;

    // // for ScatterVisualizer or RainbowCircleVisualizer
    // let listMult = -1;
    // let badAlgDiv = 0;
    // let speedCoef = 1;
    
    // for ImageVisualizer
    let listMult = 4;
    let badAlgDiv = 0;
    let speedCoef = 16;
    let badAlgSpeedCoef = 16;

    let baseSpeed = 0.0005;
    let size = Math.pow(2, 16);
    const nlogn = (n) => n*Math.log2(n);
    const nsquared = (n) => Math.pow(n, 2);
    const Ocomb = (n) => Math.pow(n, 2) / Math.pow(2, (Math.log(n)/Math.log(1.3))) * Math.pow(10, 9);

    algIterator = algSeries(
        luminanceFunc,
        [
        //quicksorts
        {n: size, speed: baseSpeed*nlogn(size), alg: new QuickSort({partitionType:"LR", pivotStyle:"Median of Three"})},
        {n: size, speed: 800, alg: new Reset()},
        {n: size, speed: baseSpeed*nlogn(size), alg: new QuickSort({partitionType:"LL", pivotStyle:"Median of Three"})},
        {n: size, speed: 800, alg: new Reset()},

        // mergesorts
        {n: size, speed: baseSpeed*nlogn(size), alg: new MergeSort()},
        {n: size, speed: 800, alg: new Reset()},
        {n: size, speed: baseSpeed*nlogn(size), alg: new IterativeMergeSort()},
        {n: size, speed: 800, alg: new Reset()},

        //bubble sorts
        {n: size/8, speed: baseSpeed*nsquared(size/8)*0.5, alg: new BubbleSort()},
        {n: size/8, speed: 800/8, alg: new Reset()},
        {n: size/8, speed: baseSpeed*nsquared(size/8)*0.5, alg: new CocktailSort()},
        {n: size/8, speed: 800/8, alg: new Reset()},
        {n: size/8, speed: baseSpeed*nsquared(size/8)*0.5, alg: new OddEvenSort()},
        {n: size/8, speed: 800/8, alg: new Reset()},
        {n: size/2, speed: baseSpeed*Ocomb(size/2), alg: new CombSort({shrink: 1.3})},
        {n: size/2, speed: 800/2, alg: new Reset()},

        //insertion sorts
        {n: size/8, speed: baseSpeed*nsquared(size/8)*0.25, alg: new InsertionSort()},
        {n: size/8, speed: 800/8, alg: new Reset()},
        {n: size/8, speed: baseSpeed*nsquared(size/8)*0.25, alg: new BinaryInsertionSort()},
        {n: size/8, speed: 800/8, alg: new Reset()},
        // {n: size/8, speed: baseSpeed*nsquared(size/8)*0.25, alg: new GnomeSort()},
        // {n: size/8, speed: 800/8, alg: new Reset()},
        {n: size, speed: baseSpeed*nlogn(size), alg: new ShellSort({shrink: 2.5})},
        {n: size, speed: 800, alg: new Reset()},

        //selection sorts
        {n: size/4, speed: baseSpeed*nsquared(size/4), alg: new SelectionSort()},
        {n: size/4, speed: 800/4, alg: new Reset()},
        {n: size/4, speed: baseSpeed*nsquared(size/4), alg: new DoubleSelectionSort()},
        {n: size/4, speed: 800/4, alg: new Reset()},
        {n: size, speed: baseSpeed*nlogn(size), alg: new HeapSort()},
        {n: size, speed: 800, alg: new Reset()},

        {n: size/2, speed: baseSpeed*nsquared(size/2)/50, alg: new StrandSortV1()},
        {n: size/2, speed: 800/2, alg: new Reset()},
        {n: size, speed: baseSpeed*nsquared(size)/100, alg: new StrandSortV2()},
        {n: size, speed: 800, alg: new Reset()},
        {n: size, speed: baseSpeed*nsquared(size)/10000, alg: new CircleSort()},
        {n: size, speed: 800, alg: new Reset()},

        // //joke sorts
        // {n: size, speed: baseSpeed, alg: new StoogeSort()},
        // {n: size, speed: 800, alg: new Reset()},
        // {n: size, speed: baseSpeed, alg: new BogoSort()},
        // {n: size, speed: 800, alg: new Reset()},
    ]);
}