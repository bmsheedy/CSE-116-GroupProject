var listOfPlayers = []; //used for game updating
var foodList = []; //used for food concurrency
var poisonList = []; //for poison concurrency

function Player(id, x, y, rad, r, g, b) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.r = r;
    this.g = g;
    this.b = b;
}

var data = {
    players: listOfPlayers,
    foods: foodList,
    poisons: poisonList
};


var express = require('express'); //calls up the module for express

var app = express();            //calls the Express module
var server = app.listen(43243);	//tells what port to host the game on


app.use(express.static('src/publics')); //tells which folder to call files from

console.log("Testing. If seen, server works!");	//tells a message to console, debugging purpose to let me know if it successfully runs

var socket = require('socket.io');
var io = socket(server);

setInterval(refresher, 33);
function refresher() {
    io.sockets.emit('refresher', data);
}

io.sockets.on('connection',
    function(socket) {
    console.log('Person connected! : ' + socket.id);
    console.log("There are now " + parseInt(listOfPlayers.length) + " players in the game!");
    socket.on('new',
        function(data) {
            console.log("Receiving " + socket.id + " " + data.x + " " + data.y + " " + data.rad);
            var playerBlob = new Player(socket.id, data.x, data.y, data.rad, data.r, data.g, data.b);
            listOfPlayers.push(playerBlob);
        });
    socket.on('update',
        function(data) {
            var player = new Player();
            for (var i = 0; i < listOfPlayers.length; i++) {
                if (socket.id === listOfPlayers[i].id) {
                    player = listOfPlayers[i];
                    player.x = data.x;
                    player.y = data.y;
                    player.rad = data.rad;
                    player.r = data.r;
                    player.g = data.g;
                    player.b = data.b;
                }
            }
            console.log("BACK");
        });
        socket.on('disconnect', function() {
            console.log("We've lost a player! " + socket.id);
            console.log("There are now " + parseInt(listOfPlayers.length) + " player(s) in the game!");
            for (var p = 0; p < listOfPlayers.length; p++) {
                if (listOfPlayers[p].id == socket.id) {
                    listOfPlayers.splice(p, 1)
                }
            }
        });
});
