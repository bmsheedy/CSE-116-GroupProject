function Player(x, y, rad) {        //constructor for players
    this.vec = createVector(x, y);
    this.radius = rad;
    this.velocity = createVector(0,0);

    this.update = function() {  //updates position
        var velocity = createVector(mouseX-width/2, mouseY-height/2);
        velocity.setMag(3); //speed of which we move
        this.velocity.lerp(velocity, 0.2);
        this.vec.add(this.velocity);
    }

    this.show = function() {    //updates display
        fill(255, 0, 0);
        ellipse(this.vec.x, this.vec.y, this.radius*2, this.radius*2);
    }
    //below determines what happens when you eat food
    this.eats = function(f) {
        var dis = p5.Vector.dist(this.vec, f.vec);  //p5 documentation for vector distances
        if(dis < this.radius + f.radius){   //compares to see if the ball collides with food
            this.radius += (f.radius * 0.1);    //this determines how big the player should grow everytime you eat food.
            return true;
        }
        else{
            return false;
        }
    }
}