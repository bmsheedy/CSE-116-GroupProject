function poison(x, y, rad) {
    this.vec = createVector(x, y);
    this.rad = rad;

    var c = color(0);

    this.show = function() {
        fill(c);
        ellipse(this.vec.x, this.vec.y, this.rad*2, this.rad*2);
    }
}