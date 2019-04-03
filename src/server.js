/*All commented out parts are either notes, examples or code to be used
when other parts are finished so that the server can run properly.
This is a basic schematic of the server and is not the perfectly
complete product and may be changed later to work better.*/
var listOfPlayers = []
var fileSystem = require('fs')

var express = require('express'); //calls up the module for express

var app = express();            //calls the Express module
var server = app.listen(43343);	//tells what port to host the game on

app.use(express.static('src')); //tells which folder to call files from

console.log("Testing");	//tells a message to console, debugging purpose to let me know if it successfully runs

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log('Person connected! : ' + socket.id);
    socket.on('new', playerInfo);

    function playerInfo(data) {
        socket.broadcast.emit('new', data);
        console.log(data);
        var playerBlob = new players(socket.id); //, data.x, data.y, data.radius);, to add later
        listOfPlayers.push(socket.id.toString());
    }
}

//below is a way to store data to a JSON file in Node.js
function storingPlayers() {
    for (var i = listOfPlayers.length; i >= 0; i++) {
        var stored = JSON.stringify(listOfPlayers[i])
        fileSystem.writeFile('data.json', stored, finish);
    }
}
function finish(exam) {
    console.log('data stored.');
}
