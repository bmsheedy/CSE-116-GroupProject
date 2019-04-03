function Player(x, y, rad) {        //constructor for players
    this.vec = createVector(x, y);
    this.radius = rad;
    this.velocity = createVector(0,0);

    this.update = function() {  //updates position
        var velocity = createVector(mouseX-width/2, mouseY-height/2);
        velocity.setMag(4); //speed of which we move
        this.velocity.lerp(velocity, 0.2);      //lerp stands for Linear Interpolation. it tells the item to follow the mouse
        this.vec.add(this.velocity);
    }

    this.show = function() {    //updates display
        fill(255, 255, 255);  //color of player
        ellipse(this.vec.x, this.vec.y, this.radius*2, this.radius*2);
    }
    //below determines what happens when you eat food
    this.eatFood = function(f) {
        var dis = p5.Vector.dist(this.vec, f.vec);  //p5 documentation for vector distances
        var RR = this.radius + f.radius;
        if(dis < RR){   //compares to see if the ball collides with food
            this.radius += .25;    //this determines how big the player should grow everytime you eat food.
            return true;
        }
        else{
            return false;
        }
    }
}