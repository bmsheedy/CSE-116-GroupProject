var player;
var fList = [];
socket = io.connect('http://localhost:43343');

function setup() {
    createCanvas(windowWidth, windowHeight);        //sets up the world
    player = new Player(width/2,height/2, 20);      //creates the player
    var t = 0;
    while(t < 2000){     //randomly generates food. later must add ways to add food if the world runs low on food.
        fList[t] = new food(random(-width, width), random(-height, height), 5);     //creates food circles
        t += 1;
    }
}


function draw() {
    background(0);      //color of our world
    translate(width/2-player.vec.x, height/2-player.vec.y);

    //below edits the list of food we have and removes food that is eaten from the world fro the food list
    for (var c = fList.length - 1; c >= 0; c--) {   //loops through descending order of the food
        fList[c].show();
        if(player.eatFood(fList[c])) {
            fList.splice(c, 1);     //removes food from the world if food is eaten
        }
    }

    player.show();
    player.update();

}