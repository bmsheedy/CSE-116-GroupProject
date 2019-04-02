function player(x, y, rad) {
    this.pos = createVector(x, y);
    this.radius = rad;
    this.velocity = createVector(0,0);

    this.update = function() {
        var velocity = createVector(mouseX-width/2, mouseY-height/2);
        velocity.setMag(3);
        this.velocity.lerp(velocity, 0.2);
        this.pos.add(this.velocity);
    }

    this.show = function() {
        fill(255, 0, 0);
        ellipse(this.pos.x, this.pos.y, this.radius*2, this.radius*2);
    }

    this.eats = function(f) {
        var dis = p5.Vector.dist(this.pos, f.pos)
        if(f.r + this.r > dis){
            this.radius += 2;
            return true;
        }
        else{
            return false;
        }
    }
}