var player;
var socket;
var view = 1;
var fList = [];
var poisList = [];
var pList = [];

function setup() {
    socket = io.connect('http://localhost:43243');
    createCanvas(windowWidth, windowHeight);        //sets up the world
    var t = 0;
    var e = 0;
    while(t < 2000){     //randomly generates food. later must add ways to add food if the world runs low on food.
        fList[t] = new food(random(-1000, 1000), random(-1000, 1000), 4, random(255), random(255), random(255));
        t += 1;
    }
    while(e < 500){
        poisList[e] = new poison(random(-1000, 1000), random(-1000, 1000), 6, 0, 0, 0);
        e += 1;
    }
    player = new Player(0 , 0, 24, random(255), random(255), random(255));      //creates the player
    //send player info to server
    var data = {
        x: player.vec.x,
        y: player.vec.y,
        rad: player.rad,
        r: player.r,
        g: player.g,
        b: player.b
    };
    socket.emit('new', data);
    //receives info from server
    socket.on('refresher',
        function(data) {
            pList = data.players;   //updates list of players according to server
            //fList = data.foods;
            //poisList = data.poisons;
            console.log("ACK");
        });
}


function draw() {
    if (player.rad > 0) {
        background(128);      //color of our world
        translate(width / 2, height / 2);   //keeps center on screen
        view = lerp(view, 128 / player.rad, 0.05);  //smooths the transition of growth
        scale(view);    //scales the view
        translate(-player.vec.x, -player.vec.y);   //adjusts position when moving
        //All code above makes it so that the player's screen zooms away as the player grows
        //It prevents the player from outgrowing the view area.

        //below edits the list of food we have and removes food that is eaten from the world fro the food list
        for (var c = fList.length - 1; c >= 0; c--) {   //loops through descending order of the food
            fList[c].show();
            if (player.eatFood(fList[c])) {
                fList.splice(c, 1);     //removes food from the world if food is eaten
            }
        }

        for (var d = poisList.length - 1; d >= 0; d--) {
            poisList[d].show();
            if (player.eatPoison(poisList[d])) {
                poisList.splice(d, 1);
            }
        }
        //if eaten/eats a player, does display
        for (var i = pList.length-1; i >= 0; i--) {
            var id = pList[i].id;
            var pos = createVector(pList[i].x, pList[i].y);
            if (id !== socket.id) {
                if (pList[i].id !== socket.id) {
                    fill(pList[i].r, pList[i].g, pList[i].b);
                    ellipse(pList[i].x, pList[i].y, pList[i].rad * 2, pList[i].rad * 2);
                    fill(255);
                    textAlign(CENTER);
                    textSize(4);
                    text(pList[i].id, pList[i].x, pList[i].y + pList[i].rad);
                    //eating a player
                    if (player.rad > pList[i].rad && player.contact(pos, pList[i].rad)) {
                        player.eatPlayers(pos, pList[i].rad);
                        var data = {
                            id: socket.id,
                            x: player.vec.x,
                            y: player.vec.y,
                            rad: player.rad,
                            r: player.r,
                            g: player.g,
                            b: player.b
                        };
                        socket.emit("update", data);
                        break;
                    }
                    //being eaten by a player
                    else if (player.rad < pList[i].rad && player.contact(pos, pList[i].rad)) {
                        player.eatPlayers(player.vec, pList[i].vec);
                        player = new Player(0, 0, 0, 0, 0, 0);  //sets player to a null status when eaten
                        break;
                    }
                }
            }
        }
        socket.on('refresher',
            function(data) {
                pList = data.players;   //updates list of players according to server
                //fList = data.foods;
                //poisList = data.poisons;
            });
        player.show();
        if (mouseIsPressed) {
            player.update()
        }
        player.OoB();
        //resend updated information to the server
        var data = {
            x: player.vec.x,
            y: player.vec.y,
            rad: player.rad,
            r: player.r,
            g: player.g,
            b: player.b

        };

        socket.emit('update', data)
    }
    //Game over status. This happens when a player's radius is 0
    else if (player.rad === 0) {
        background(0);
        stroke(255);
        textAlign(CENTER);
        textSize(64);
        text("You were killed! Refresh/Restart to try again.", width / 2, height / 2);
    }
}