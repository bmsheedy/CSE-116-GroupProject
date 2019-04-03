function food(x, y, rad) {
    this.vec = createVector(x, y);
    this.radius = rad;

    var c = color(255)
    var red = color(255, 0, 0)
    var green = color(0, 255, 0)
    var blue = color(0, 0, 255)
    var yellow = color(255, 255, 0)
    var orange = color(255, 127, 0)
    var purple = color(128, 0, 128)

    var n = Math.floor((Math.random() * 6) + 1)

    if(n == 1){
        c = red
    }
    else if(n == 2){
        c = orange
    }
    else if(n == 3){
        c = yellow
    }
    else if(n == 4){
        c = green
    }
    else if(n == 5){
        c = blue
    }
    else{
        c = purple
    }

    this.show = function() {
        fill(c);
        ellipse(this.vec.x, this.vec.y, this.radius*2, this.radius*2);
    }
}

//this file/class serves as the constructor for food