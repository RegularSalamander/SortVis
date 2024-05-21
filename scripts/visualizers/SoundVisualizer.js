class SoundVisualizer extends Visualizer {
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

        document.addEventListener("visibilitychange", (event) => {
            if (document.visibilityState == "visible") {
                this.gain.gain.setTargetAtTime(0.1, this.context.currentTime, 0.04);
            } else {
                this.gain.gain.setTargetAtTime(0.00001, this.context.currentTime, 0.04);
            }
        });
    }

    useAlgorithm(alg) {
        super.useAlgorithm(alg);

        if(this.started){
            this.gain.gain.setTargetAtTime(0.1, this.context.currentTime, 0.04);
        }
    }

    step(iters) {
        let wasDone = this.done; 

        super.step(iters)

        if(!wasDone && this.done) {
            this.gain.gain.setTargetAtTime(0.00001, this.context.currentTime, 0.04);
            return;
        }

        //if odd number of values, duplicate the last value
        if(this.alg.values.length % 2 == 1) {
            this.alg.values.push(this.alg.values[this.alg.values.length-1]);
        }

        if(fullSound) {
            //play each frequency sequentially
            for(let i = 0; i < this.alg.values.length; i += 2) {
                this.osc1.frequency.linearRampToValueAtTime(
                    map(this.alg.values[i], this.min, this.max, 110, 440),
                    this.context.currentTime + i/60/this.alg.values.length
                );
                this.osc2.frequency.linearRampToValueAtTime(
                    map(this.alg.values[i+1], this.min, this.max, 110, 440) + 10, //slight offset of 10 Hz
                    this.context.currentTime + i/60/this.alg.values.length
                );
            }
        } else {
            //play only the last two frequencies
            this.osc1.frequency.linearRampToValueAtTime(
                map(this.alg.values[this.alg.values.length-2], this.min, this.max, 110, 440),
                this.context.currentTime + 1/60
            );
            this.osc2.frequency.linearRampToValueAtTime(
                map(this.alg.values[this.alg.values.length-1], this.min, this.max, 110, 440),
                this.context.currentTime + 1/60
            );
        }
    }
}