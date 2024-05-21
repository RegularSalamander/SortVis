imgAddress = "https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png";

function loadSequence() {
    flashing = false;
    fullSound = true;

    vis = new RainbowBarVisualizer(img, 1);

    algIterator = algSeries([
        //bubble sorts
        {n: Math.pow(2, 9), speed: 10, alg: new Shuffle()},
        {n: Math.pow(2, 9), speed: 100, alg: new BubbleSort()},
        {n: Math.pow(2, 9), speed: 10, alg: new Shuffle()},
        {n: Math.pow(2, 9), speed: 100, alg: new CocktailSort()},
        {n: Math.pow(2, 9), speed: 10, alg: new Shuffle()},
        {n: Math.pow(2, 9), speed: 100, alg: new OddEvenSort()},
        {n: Math.pow(2, 11), speed: 40, alg: new Shuffle()},
        {n: Math.pow(2, 11), speed: 100, alg: new CombSort({shrink: 1.3})},

        //insertion sorts
        {n: Math.pow(2, 10), speed: 20, alg: new Shuffle()},
        {n: Math.pow(2, 10), speed: 100, alg: new InsertionSort()},
        {n: Math.pow(2, 10), speed: 20, alg: new Shuffle()},
        {n: Math.pow(2, 10), speed: 100, alg: new BinaryInsertionSort()},
        {n: Math.pow(2, 9), speed: 10, alg: new Shuffle()},
        {n: Math.pow(2, 9), speed: 100, alg: new GnomeSort()},
        {n: Math.pow(2, 12), speed: 80, alg: new Shuffle()},
        {n: Math.pow(2, 12), speed: 100, alg: new ShellSort({shrink: 2.5})},

        //selection sorts
        {n: Math.pow(2, 9), speed: 10, alg: new Shuffle()},
        {n: Math.pow(2, 9), speed: 100, alg: new SelectionSort()},
        {n: Math.pow(2, 9), speed: 10, alg: new Shuffle()},
        {n: Math.pow(2, 9), speed: 100, alg: new DoubleSelectionSort()},
        {n: Math.pow(2, 12), speed: 80, alg: new Shuffle()},
        {n: Math.pow(2, 12), speed: 50, alg: new HeapSort()},
        
        //quicksorts
        {n: Math.pow(2, 12), speed: 80, alg: new Shuffle()},
        {n: Math.pow(2, 12), speed: 50, alg: new QuickSort({partitionType:"LR"})},
        {n: Math.pow(2, 12), speed: 80, alg: new Shuffle()},
        {n: Math.pow(2, 12), speed: 50, alg: new QuickSort({partitionType:"LL"})},

        //mergesorts
        {n: Math.pow(2, 12), speed: 80, alg: new Shuffle()},
        {n: Math.pow(2, 12), speed: 50, alg: new MergeSort()},
        {n: Math.pow(2, 12), speed: 80, alg: new Shuffle()},
        {n: Math.pow(2, 12), speed: 50, alg: new IterativeMergeSort()},
    ]);
}