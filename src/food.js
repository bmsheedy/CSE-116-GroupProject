function food(x, y, rad) {
    this.vec = createVector(x, y);
    this.radius = rad;

    var r1 =

    this.show = function() {
        fill(255);
        ellipse(this.vec.x, this.vec.y, this.radius*2, this.radius*2);
    }
}

//this file/class serves as the constructor for food