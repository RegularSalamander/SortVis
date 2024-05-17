class BarVisualizer extends Visualizer {
    setup() {
        if(this.started) return;

        this.started = true;

        this.context = new AudioContext();
        this.osc1 = this.context.createOscillator();
        this.osc2 = this.context.createOscillator();
        this.gain = this.context.createGain();
        this.osc1.connect(this.gain);
        this.osc2.connect(this.gain);
        this.gain.connect(this.context.destination);
        this.osc1.start(0);
        this.osc2.start(0);
        this.osc1.type = 'triangle';
        this.osc2.type = 'triangle';
        this.gain.gain.value = 0.1;
    }
    
    draw() {
        background(0);
        noStroke();
        for(let i = 0; i < this.arr.length; i++) {
            if(this.alg.accessing.indexOf(i) >= 0) fill(255, 0, 0);
            else fill(255);
            rect(i*width/this.arr.length, height*(1-this.arr[i]/this.max), width/this.arr.length, height*this.arr[i]/this.max);
        }
    }

    step(iters) {
        super.step(iters)

        if(this.done) {
            this.gain.gain.exponentialRampToValueAtTime(0.00001, 0.1);
            return;
        } else {
            this.gain.gain.exponentialRampToValueAtTime(0.1, 0.1);
        }

        for(let i = 0; i < this.alg.values.length; i += 2) {
            this.osc1.frequency.exponentialRampToValueAtTime(
                map(this.alg.values[i], 0, this.max, 110, 440),
                this.context.currentTime + 0
            );
            this.osc2.frequency.exponentialRampToValueAtTime(
                map(this.alg.values[i+1], 0, this.max, 110, 440),
                this.context.currentTime + 0
            );
        }
    }
}