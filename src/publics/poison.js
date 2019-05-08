function poison(x, y, rad, r, g, b) {
    this.vec = createVector(x, y);
    this.rad = rad;
    this.r = r;
    this.g = g;
    this.b = b;

    this.show = function() {
        fill(this.r, this.g, this.b);
        ellipse(this.vec.x, this.vec.y, this.rad*2, this.rad*2);
    }
}