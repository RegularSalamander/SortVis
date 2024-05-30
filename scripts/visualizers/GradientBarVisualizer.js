class GradientBarVisualizer extends SoundVisualizer {
    constructor() {
        super();

        this.gradient = arguments;
        while(this.gradient.length < 2) this.gradient.push([255, 255, 255]);

        console.log(this.gradient);
    }

    draw() {
        background(0);
        noStroke();

        for(let i = 0; i < this.arr.length; i++) {
            let subs = this.gradient.length - 1;
            let t = map(this.arr[i].value, this.min, this.max+1, 0, 1);
            let sect = Math.floor(t*subs);
            let innert = (t * subs) % 1;

            let col = [];
            for(let i = 0; i < this.gradient[0].length; i++) {
                col.push(map(innert, 0, 1, this.gradient[sect][i], this.gradient[sect+1][i]));
            }

            fill(col);

            rect(
                Math.floor(i*width/this.arr.length),
                height*(1-this.arr[i].value/this.max),
                Math.ceil(width/this.arr.length),
                height*this.arr[i].value/this.max
            );

            if(flashing && this.alg.accessing.has(i)) {
                fill(255, 255, 255, 128);
                rect(
                    Math.floor(i*width/this.arr.length),
                    height*(1-this.arr[i].value/this.max),
                    Math.ceil(width/this.arr.length),
                    height*this.arr[i].value/this.max
                );
            }
        }
    }
}