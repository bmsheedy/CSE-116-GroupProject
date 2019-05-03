var express = require('express'); //calls up the module for express

var app = express();            //calls the Express module
var server = app.listen(43343);	//tells what port to host the game on

app.use(express.static('src/publics')); //tells which folder to call files from

console.log("Testing");	//tells a message to console, debugging purpose to let me know if it successfully runs

var socket = require('socket.io');
var io = socket(server);

var listOfPlayers = []; //used for game updating

function Player(name, x, y, rad) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.rad = rad;
}

setInterval(refresher, 33);
function refresher() {
    io.sockets.emit('refresher', listOfPlayers);
}

io.sockets.on('connect',
    function(socket) {
    console.log('Person connected! : ' + socket.id);
    socket.on('new',
        function(data) {
            console.log("Receiving" + socket.id + " " + data.x + " " + data.y + " " + data.rad);
            var playerBlob = new Player(socket.id, data.x, data.y, data.rad);
            listOfPlayers.push(playerBlob);
        });

    socket.on('update',
        function(data) {
            var player = new Player(null, 0, 0, 0)
            for (var i = 0; i < listOfPlayers.length; i++) {
                if (socket.id == listOfPlayers[i].id) {
                    player = listOfPlayers[i];
                }
            }
            player.x = data.x;
            player.y = data.y;
            player.rad = data.rad;
        });
});
