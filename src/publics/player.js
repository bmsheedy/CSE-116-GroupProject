function Player(x, y, rad) {        //constructor for players
    this.vec = createVector(x, y);
    this.rad = rad;
    this.velocity = createVector(0,0);

    this.update = function() {  //updates position
        var velocity = createVector(mouseX-width/2, mouseY-height/2);
        velocity.setMag(4); //speed of which we move
        this.velocity.lerp(velocity, 0.2);      //lerp stands for Linear Interpolation. steadies growth
        this.vec.add(this.velocity);
    };

    this.show = function() {    //updates display
        fill(255, 255, 255);  //color of player
        ellipse(this.vec.x, this.vec.y, this.rad*2, this.rad*2);
    };
    //below determines what happens when you eat food
    this.eatFood = function(f) {
        var dis = p5.Vector.dist(this.vec, f.vec);  //p5 documentation for vector distances
        var RR = this.rad + f.rad;
        if(dis < RR){   //compares to see if the ball collides with food
            this.rad += .25;    //this determines how big the player should grow everytime you eat food.
            return true;
        }
        else{
            return false;
        }
    };

    this.eatPlayers = function(otherPlayer) {
        var dis = p5.Vector.dist(this.vec, otherPlayer.vec);
        var RR = this.rad + otherPlayer.rad;
        if(dis < RR){
            if(this.rad > otherPlayer.rad){
                this.rad += otherPlayer.rad;
                return true;
            }
        }
        else{
            return false;
        }
    };

    this.eatPoison = function(f) {
        var dis = p5.Vector.dist(this.vec, f.vec);
        var PR = this.rad + f.rad;
        if (dis < PR) {
            if (this.rad >= f.rad) {
                this.rad -= .5;
                return true;
            }
        }
        else {
            return false;
        }
    };


    this.OoB = function(){

        if(this.vec.x > 500 || this.vec.x < -500){
            return true;
        }
        else if(this.vec.y > 500 || this.vec.y <-500){
            return true;
        }
        else{
            return false
        }
    };
}