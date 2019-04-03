function food(x, y, rad) {
    this.pos = createVector(x, y);
    this.radius = rad;

    this.show = function() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, this.radius*2, this.radius*2);
    }
}

//this file/class serves as the constructor for food