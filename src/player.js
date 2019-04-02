function player(x, y, rad) {
    this.pos = createVector(x, y);
    this.radius = rad;
    this.vel = createVector(0,0);

    this.update = function() {
        var vel = createVector(mouseX-width/2, mouseY-height/2);
        vel.setMag(3);
        this.vel.lerp(vel, 0.2);
        this.pos.add(this.vel);
    }

    this.show = function() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, this.radius*2, this.radius*2);
    }
}