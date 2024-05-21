// imgAddress = "https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png";

function loadSequence() {
    flashing = true;
    fullSound = true;

    // vis = new BarVisualizer();
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
    let badAlgDiv = 3;
    let speedCoef = 32;

    algIterator = algSeries(
        (a) => a.r + a.g + a.b,
        [
        // //quicksorts
        // {n: Math.pow(2, 12+listMult), speed: 80*speedCoef, alg: new Shuffle()},
        // {n: Math.pow(2, 12+listMult), speed: 50*speedCoef, alg: new QuickSort({partitionType:"LR", pivotStyle:"Median of Three"})},
        // {n: Math.pow(2, 12+listMult), speed: 80*speedCoef, alg: new Shuffle()},
        // {n: Math.pow(2, 12+listMult), speed: 50*speedCoef, alg: new QuickSort({partitionType:"LL", pivotStyle:"Median of Three"})},

        //mergesorts
        {n: Math.pow(2, 12+listMult), speed: 80*speedCoef, alg: new Shuffle()},
        {n: Math.pow(2, 12+listMult), speed: 50*speedCoef, alg: new MergeSort()},
        {n: Math.pow(2, 12+listMult), speed: 80*speedCoef, alg: new Shuffle()},
        {n: Math.pow(2, 12+listMult), speed: 50*speedCoef, alg: new IterativeMergeSort()},

        //bubble sorts
        {n: Math.pow(2, 9+listMult-badAlgDiv), speed: 10*speedCoef, alg: new Shuffle()},
        {n: Math.pow(2, 9+listMult-badAlgDiv), speed: 50*speedCoef, alg: new BubbleSort()},
        {n: Math.pow(2, 9+listMult-badAlgDiv), speed: 10*speedCoef, alg: new Shuffle()},
        {n: Math.pow(2, 9+listMult-badAlgDiv), speed: 50*speedCoef, alg: new CocktailSort()},
        {n: Math.pow(2, 9+listMult-badAlgDiv), speed: 10*speedCoef, alg: new Shuffle()},
        {n: Math.pow(2, 9+listMult-badAlgDiv), speed: 50*speedCoef, alg: new OddEvenSort()},
        {n: Math.pow(2, 11+listMult), speed: 40*speedCoef, alg: new Shuffle()},
        {n: Math.pow(2, 11+listMult), speed: 50*speedCoef, alg: new CombSort({shrink: 1.3})},

        //insertion sorts
        {n: Math.pow(2, 9+listMult-badAlgDiv), speed: 20*speedCoef, alg: new Shuffle()},
        {n: Math.pow(2, 9+listMult-badAlgDiv), speed: 50*speedCoef, alg: new InsertionSort()},
        {n: Math.pow(2, 9+listMult-badAlgDiv), speed: 20*speedCoef, alg: new Shuffle()},
        {n: Math.pow(2, 9+listMult-badAlgDiv), speed: 50*speedCoef, alg: new BinaryInsertionSort()},
        {n: Math.pow(2, 9+listMult-badAlgDiv), speed: 10*speedCoef, alg: new Shuffle()},
        {n: Math.pow(2, 9+listMult-badAlgDiv), speed: 50*speedCoef, alg: new GnomeSort()},
        {n: Math.pow(2, 12+listMult), speed: 80*speedCoef, alg: new Shuffle()},
        {n: Math.pow(2, 12+listMult), speed: 50*speedCoef, alg: new ShellSort({shrink: 2.5})},

        //selection sorts
        {n: Math.pow(2, 9+listMult-badAlgDiv), speed: 10*speedCoef, alg: new Shuffle()},
        {n: Math.pow(2, 9+listMult-badAlgDiv), speed: 50*speedCoef, alg: new SelectionSort()},
        {n: Math.pow(2, 9+listMult-badAlgDiv), speed: 10*speedCoef, alg: new Shuffle()},
        {n: Math.pow(2, 9+listMult-badAlgDiv), speed: 50*speedCoef, alg: new DoubleSelectionSort()},
        {n: Math.pow(2, 12+listMult), speed: 80*speedCoef, alg: new Shuffle()},
        {n: Math.pow(2, 12+listMult), speed: 50*speedCoef, alg: new HeapSort()},

        //joke sorts
        {n: Math.pow(2, 8+listMult-badAlgDiv), speed: 5*speedCoef, alg: new Shuffle()},
        {n: Math.pow(2, 8+listMult-badAlgDiv), speed: 50*speedCoef, alg: new StoogeSort()},
        {n: 9, speed: 0.18, alg: new Shuffle()},
        {n: 9, speed: 1000, alg: new BogoSort()}
    ]);
}