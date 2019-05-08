function Player(x, y, rad, r, g, b) {        //constructor for players
    this.vec = createVector(x, y);
    this.rad = rad;
    this.velocity = createVector(0,0);
    this.r = r;
    this.g = g;
    this.b = b;

    //determine if a player is touching something (for player-player purpose)
    this.contact = function (pos, rad) {
        if (rad === 0  || this.rad === 0) {
            return false;
        }
        var dist = p5.Vector.dist(this.vec, pos);
        if (dist < this.rad + rad) {
            return true;
        }
        return false;
    };

    this.update = function() {  //updates position
        var velocity = createVector(mouseX-width/2, mouseY-height/2);
        velocity.setMag(4); //speed of which we move
        this.velocity.lerp(velocity, 0.2);      //lerp stands for Linear Interpolation. steadies growth
        this.vec.add(this.velocity);
    };

    this.show = function() {    //updates display
        fill(this.r, this.g, this.b);  //color of player
        ellipse(this.vec.x, this.vec.y, this.rad*2, this.rad*2);
        fill(255);
        textAlign(CENTER);
        textSize(4);
        text(socket.id, this.vec.x, this.vec.y + this.rad);
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
    //math for eating a player
    this.eatPlayers = function(pos, rad) {
        var dis = p5.Vector.dist(this.vec, pos);
        var RR = this.rad + rad;
        if (dis < RR) {
            var sum = Math.PI * this.rad * this.rad + Math.PI * rad * rad;  //combines areas of players, pi*r^2 of current + other
            this.rad = Math.sqrt(sum / Math.PI) //updating radius according to other player size
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
        player.vec.x = constrain(this.vec.x, -1000, 1000);
        player.vec.y = constrain(this.vec.y, -1000, 1000);
    };
}