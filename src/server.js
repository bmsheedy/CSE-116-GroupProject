var listOfPlayers = []; //used for game updating

function Player(id, x, y, rad) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.rad = rad;
}


var express = require('express'); //calls up the module for express

var app = express();            //calls the Express module
var server = app.listen(process.env.PORT || 43343, listen);	//tells what port to host the game on

function listen() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://' + host + ':' + port);
}

app.use(express.static('src/publics')); //tells which folder to call files from

console.log("Testing");	//tells a message to console, debugging purpose to let me know if it successfully runs

var socket = require('socket.io');
var io = socket(server);

setInterval(refresher, 33);
function refresher() {
    io.sockets.emit('refresher', listOfPlayers);
}

io.sockets.on('connection',
    function(socket) {
    console.log('Person connected! : ' + socket.id);
    socket.on('new',
        function(data) {
            console.log("Receiving " + socket.id + " " + data.x + " " + data.y + " " + data.rad);
            var playerBlob = new Player(socket.id, data.x, data.y, data.rad);
            listOfPlayers.push(playerBlob);
        });

    socket.on('update',
        function(data) {
            var player = new Player();
            for (var i = 0; i < listOfPlayers.length; i++) {
                if (socket.id == listOfPlayers[i].id) {
                    player = listOfPlayers[i];
                }
            }
            player.x = data.x;
            player.y = data.y;
            player.rad = data.rad;
        });
        socket.on('disconnect', function() {
            console.log("We've lost a player! " + socket.id);
            for (var p = 0; p < listOfPlayers.length; p++) {
                if (listOfPlayers[p].id == socket.id) {
                    listOfPlayers.splice(p, 1)
                }
            }
        });
});
