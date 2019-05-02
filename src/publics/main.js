var player;
var socket;
var view = 1;
var fList = [];
var pList = [];

function setup() {
    socket = io.connect('http://localhost:43343');
    createCanvas(windowWidth, windowHeight);        //sets up the world
    var t = 0;
    while(t < 2000){     //randomly generates food. later must add ways to add food if the world runs low on food.
        fList[t] = new food(random(-width, width), random(-height, height), 4);     //creates food circles
        t += 1;
    }
    player = new Player(random(width),random(height), 24);      //creates the player
    var data = {
        x: player.vec.x,
        y: player.vec.y,
        rad: player.rad
    };
    socket.emit('new', data);
    socket.on('refresher',
        function(data) {
            pList = data;   //updates list of players according to server
        });
}


function draw() {
    background(128);      //color of our world
    translate(width/2, height/2);   //keeps center on screen
    view = lerp(view, 128 / player.rad, 0.05);  //smooths the transition of growth
    scale(view);    //scales the view
    translate(-player.vec.x, -player.vec.y);   //adjusts position when moving
    //All code above makes it so that the player's screen zooms away as the player grows
    //It prevents the player from outgrowing the view area.

    //below edits the list of food we have and removes food that is eaten from the world fro the food list
    for (var c = fList.length - 1; c >= 0; c--) {   //loops through descending order of the food
        fList[c].show();
        if(player.eatFood(fList[c])) {
            fList.splice(c, 1);     //removes food from the world if food is eaten
        }
    }

    player.show();
    if (mouseIsPressed) {
        player.update()
    }
    var data = {
        x: player.vec.x,
        y: player.vec.y,
        rad: player.rad
    };

    socket.emit('update', data)

}