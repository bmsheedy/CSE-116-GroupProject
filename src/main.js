var player;
var fList = [];
socket = io.connect('http://localhost:43343');

function setup() {
    createCanvas(1200, 800);        //sets up the world
    player = new Player(width/2,height/2, 20);      //creates the player
    var t = 0;
    while(t < 200){     //randomly generates food. later must add ways to add food if the world runs low on food.
        fList[t] = new food(random(width), random(height), 10);     //creates food circles
        t += 1;
    }
}


function draw() {
    background(0);      //color of our world
    translate(width/2-player.vec.x, height/2-player.vec.y);

    //below edits the list of food we have and removes food that is eaten from the world fro the food list
    for (c = fList.length - 1; c >= 0; c--) {   //loops through descending order of the food
        fList[c].show();
        if(player.eats(fList[c])) {
            fList.splice(c, 1);
        }
    }

    player.show();
    player.update();

}