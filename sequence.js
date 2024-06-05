// imgAddress = "https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png";
// imgAddress = "https://upload.wikimedia.org/wikipedia/commons/d/d1/PM5544_MK10.png"
// imgAddress = "https://upload.wikimedia.org/wikipedia/commons/8/82/Gold_Hill%2C_Shaftsbury%2C_Dorset%2C_England.JPG"

const idxFunc = (a) => a.index;
const brightnessFunc = (a) => - (a.r + a.g + a.b + Math.random())
const luminanceFunc = (a) => - ((0.2126*a.r + 0.7152*a.g + 0.0722*a.b)*50 + Math.random())
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
    flashing = true;
    fullSound = true;

    vis = new GradientBarVisualizer([255, 50, 50], [255, 255, 50], [50, 255, 50]);
    // vis = new ScatterVisualizer();
    // vis = new RainbowCircleVisualizer();
    // vis = new ImageVisualizer(img, 1);

    let size = 4096;

    algIterator = algSeries(
        idxFunc,
        [
        // quick sorts
        {n: size, speed: 160, alg: new Shuffle()},
        {n: size, speed: 32.4, alg: new QuickSort({partitionType:"LR", pivotStyle:"Median of Three"})},
        {n: size, speed: 160, alg: new Shuffle()},
        {n: size, speed: 32.4, alg: new QuickSort({partitionType:"LL", pivotStyle:"Median of Three"})},
        {n: size, speed: 160, alg: new Shuffle()},
        {n: size, speed: 32.4, alg: new DualPivotQuickSort({pivotStyle:"First and Last Elements"})},
        {n: size, speed: 160, alg: new Shuffle()},
        {n: size, speed: 32.4, alg: new ThreeWayRadixQuickSort({base: 10, pivotStyle:"Last Element"})},
        {n: size, speed: 160, alg: new Shuffle()},
        {n: size, speed: 32.4, alg: new MultithreadedQuickSort({maxThreads: 8, pivotStyle:"Median of Three"})},

        // merge sorts
        {n: size, speed: 160, alg: new Shuffle()},
        {n: size, speed: 57.4, alg: new MergeSort()},
        {n: size, speed: 160, alg: new Shuffle()},
        {n: size, speed: 57.4, alg: new IterativeMergeSort()},
        {n: size, speed: 160, alg: new Shuffle()},
        {n: size, speed: 57.4, alg: new MultithreadedMergeSort({maxThreads: 8})},

        // radix sorts
        {n: size, speed: 160, alg: new Shuffle()},
        {n: size, speed: 61.4, alg: new RadixLSDSort({base: 2})},
        {n: size, speed: 160, alg: new Shuffle()},
        {n: size, speed: 61.4, alg: new RadixMSDSort({base: 2})},
        {n: size, speed: 160, alg: new Shuffle()},
        {n: size, speed: 61.4, alg: new RadixLSDSort({base: 10})},
        {n: size, speed: 160, alg: new Shuffle()},
        {n: size, speed: 61.4, alg: new RadixMSDSort({base: 10})},

        // sorting networks
        {n: size, speed: 160, alg: new Shuffle()},
        {n: size, speed: 94.8, alg: new BitonicMergeSort({concurrent:false})},
        {n: size, speed: 160, alg: new Shuffle()},
        {n: size, speed: 0.5, alg: new BitonicMergeSort({concurrent:true})},

        // bubble sorts
        {n: size/4, speed: 160/4, alg: new Shuffle()},
        {n: size/4, speed: 294, alg: new BubbleSort()},
        {n: size/4, speed: 160/4, alg: new Shuffle()},
        {n: size/4, speed: 294, alg: new CocktailSort()},
        {n: size/4, speed: 160/4, alg: new Shuffle()},
        {n: size/4, speed: 294, alg: new OddEvenSort()},
        {n: size, speed: 160, alg: new Shuffle()},
        {n: size, speed: 68.8, alg: new CombSort({shrink: 1.3})},

        // insertion sorts
        {n: size/4, speed: 160/4, alg: new Shuffle()},
        {n: size/4, speed: 250, alg: new InsertionSort()},
        {n: size/4, speed: 160/4, alg: new Shuffle()},
        {n: size/4, speed: 250, alg: new BinaryInsertionSort()},
        {n: size/4, speed: 160/4, alg: new Shuffle()},
        {n: size/4, speed: 291, alg: new GnomeSort()},
        {n: size, speed: 160, alg: new Shuffle()},
        {n: size, speed: 44.1, alg: new ShellSort({shrink: 2.5})},

        // selection sorts
        {n: size/4, speed: 160/4, alg: new Shuffle()},
        {n: size/4, speed: 293, alg: new SelectionSort()},
        {n: size/4, speed: 160/4, alg: new Shuffle()},
        {n: size/4, speed: 293, alg: new MaxSelectionSort()},
        // {n: size/4, speed: 160/4, alg: new Shuffle()},
        // {n: size/4, speed: 293, alg: new BingoSort()},
        {n: size/4, speed: 160/4, alg: new Shuffle()},
        {n: size/4, speed: 293, alg: new DoubleSelectionSort()},
        {n: size, speed: 160, alg: new Shuffle()},
        {n: size, speed: 27.0, alg: new HeapSort()},

        {n: size, speed: 160, alg: new Shuffle()},
        {n: size, speed: 707, alg: new StrandSortV1()},
        {n: size, speed: 160, alg: new Shuffle()},
        {n: size, speed: 250, alg: new StrandSortV2()},
        {n: size, speed: 160, alg: new Shuffle()},
        {n: size, speed: 145, alg: new CircleSort()},

        //joke sorts
        // {n: size/8, speed: 160/8, alg: new Shuffle()},
        // {n: size/8, speed: 17519, alg: new StoogeSort()},
        {n: size, speed: 160, alg: new Shuffle()},
        {n: size, speed: 1000*1, alg: new BogoSort()},
    ]);
}