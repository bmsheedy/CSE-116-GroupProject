function food(x, y, rad) {
    this.pos = createVector(x, y);
    this.radius = rad;
    this.vel = createVector(0,0);

    this.show = function() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, this.radius*2, this.radius*2);
    }
}