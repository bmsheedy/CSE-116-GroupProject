function Player(x, y, rad) {
    this.pos = createVector(x, y);
    this.radius = rad;
    this.velocity = createVector(0,0);

    this.update = function() {
        var velocity = createVector(mouseX-width/2, mouseY-height/2);
        velocity.setMag(3); //speed of which we move
        this.velocity.lerp(velocity, 0.2);
        this.pos.add(this.velocity);
    }

    this.show = function() {
        fill(255, 0, 0);
        ellipse(this.pos.x, this.pos.y, this.radius*2, this.radius*2);
    }
    //below determines what happens when you eat food
    this.eats = function(f) {
        var dis = p5.Vector.dist(this.pos, f.pos);  //p5 documentation for vector distances
        if(dis < this.radius + f.radius){
            this.radius += (f.radius * 0.1);    //this determines how big the player should grow everytime you eat food.
            return true;
        }
        else{
            return false;
        }
    }
}