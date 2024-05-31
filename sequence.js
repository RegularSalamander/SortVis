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
    fullSound = false;

    vis = new GradientBarVisualizer([255, 50, 50], [255, 255, 50], [50, 255, 50]);
    // vis = new ScatterVisualizer();
    // vis = new RainbowCircleVisualizer();
    // vis = new ImageVisualizer(img, 1);

    let size = 128;

    algIterator = algSeries(
        idxFunc,
        [
        // quick sorts
        {n: size, speed: 1, alg: new Shuffle()},
        {n: size, speed: 0.55, alg: new QuickSort({partitionType:"LR", pivotStyle:"Median of Three"})},
        {n: size, speed: 1, alg: new Shuffle()},
        {n: size, speed: 0.61, alg: new QuickSort({partitionType:"LL", pivotStyle:"Median of Three"})},
        {n: size, speed: 1, alg: new Shuffle()},
        {n: size, speed: 0.33, alg: new DualPivotQuickSort({pivotStyle:"First and Last Elements"})},
        {n: size, speed: 1, alg: new Shuffle()},
        {n: size, speed: 1, alg: new ThreeWayRadixQuickSort({})},

        // // merge sorts
        // {n: size, speed: 1, alg: new Shuffle()},
        // {n: size, speed: 0.99, alg: new MergeSort()},
        // {n: size, speed: 1, alg: new Shuffle()},
        // {n: size, speed: 0.99, alg: new IterativeMergeSort()},

        // radix sorts
        {n: size, speed: 10*1, alg: new Shuffle()},
        {n: size, speed: 10*1.0, alg: new RadixLSDSort({base: 2})},
        {n: size, speed: 10*1, alg: new Shuffle()},
        {n: size, speed: 10*1.0, alg: new RadixMSDSort({base: 2})},
        {n: size, speed: 10*1, alg: new Shuffle()},
        {n: size, speed: 10*0.42, alg: new RadixLSDSort({base: 10})},
        {n: size, speed: 10*1, alg: new Shuffle()},
        {n: size, speed: 10*0.42, alg: new RadixMSDSort({base: 10})},

        // //bubble sorts
        // {n: size, speed: 1, alg: new Shuffle()},
        // {n: size, speed: 4.4, alg: new BubbleSort()},
        // {n: size, speed: 1, alg: new Shuffle()},
        // {n: size, speed: 3.5, alg: new CocktailSort()},
        // {n: size, speed: 1, alg: new Shuffle()},
        // {n: size, speed: 4.2, alg: new OddEvenSort()},
        // {n: size, speed: 1, alg: new Shuffle()},
        // {n: size, speed: 0.99, alg: new CombSort({shrink: 1.3})},

        // //insertion sorts
        // {n: size, speed: 1, alg: new Shuffle()},
        // {n: size, speed: 2.2, alg: new InsertionSort()},
        // {n: size, speed: 1, alg: new Shuffle()},
        // {n: size, speed: 2.7, alg: new BinaryInsertionSort()},
        // {n: size, speed: 1, alg: new Shuffle()},
        // {n: size, speed: 4.5, alg: new GnomeSort()},
        // {n: size, speed: 1, alg: new Shuffle()},
        // {n: size, speed: 0.61, alg: new ShellSort({shrink: 2.5})},

        // //selection sorts
        // {n: size, speed: 1, alg: new Shuffle()},
        // {n: size, speed: 4.7, alg: new SelectionSort()},
        // {n: size, speed: 1, alg: new Shuffle()},
        // {n: size, speed: 4.6, alg: new MaxSelectionSort()},
        // // {n: size, speed: 1, alg: new Shuffle()},
        // // {n: size, speed: 1, alg: new BingoSort()},
        // {n: size, speed: 1, alg: new Shuffle()},
        // {n: size, speed: 2.4, alg: new DoubleSelectionSort()},
        // {n: size, speed: 1, alg: new Shuffle()},
        // {n: size, speed: 0.43, alg: new HeapSort()},

        // {n: size, speed: 1, alg: new Shuffle()},
        // {n: size, speed: 2.9, alg: new StrandSortV1()},
        // {n: size, speed: 1, alg: new Shuffle()},
        // {n: size, speed: 1.3, alg: new StrandSortV2()},
        // {n: size, speed: 1, alg: new Shuffle()},
        // {n: size, speed: 1.5, alg: new CircleSort()},

        // //joke sorts
        // {n: size, speed: 1, alg: new Shuffle()},
        // {n: size, speed: 99, alg: new StoogeSort()},
        // // {n: size, speed: 1, alg: new Shuffle()},
        // // {n: size, speed: 1, alg: new BogoSort()},
    ]);
}