/*All commented out parts are either notes, examples or code to be used
when other parts are finished so that the server can run properly.
This is a basic schematic of the server and is not the perfectly
complete product and may be changed later to work better.*/
//Coded using examples off of YouTube and Google, notably YT Channel Coding Train
var listOfPlayers = []

var express = require('express');

var app = express();
var server = app.listen(63343);	//tells what port to host the game on

app.use(express.static('src'));

console.log("Testing");	//tells a message to console, debugging purpose to let me know if it successfully runs

var socket = require('socket.io');

var io = socket(server);

//setInterval(oncePerSecond, 16.66);		// sets the update time server-side. 1000 is in milliseconds. 1000 = 1sec, 16.66 = 60 FPS

//function oncePerSecond() {				// this function will relay a message continually to clients with a list of players/messages
//    io.sockets.emit('oncePerSecond'); //in real use send listOfPlayers
//}

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log('Person connected! : ' + socket.id);
    socket.on('new', playerInfo);

    function playerInfo(data) {
        socket.broadcast.emit('new', data);
        // io.sockets.emit('mouse', data);
        // above is the global to send to all clients, including self
        console.log(data);
        var playerBlob = new players(socket.id); //, data.x, data.y, data.radius);, to add later
        //listOfPlayers.push(playerBlob);
        listOfPlayers.push(socket.id);
    }
}

//below is a way to store data to a JSON file in Node.js

var fileSystem = require('fs')
var stored = JSON.stringify(listOfPlayers);	//null is from documentation. unsure of meaning. 2 is indentation
fileSystem.writeFile('data.json', stored, finish);

function finish(exam) {
    console.log('data stored.');
}

/*const fs = require('fs');
const content = JSON.stringify(listOfPlayers);

fs.writeFile('data.json', content, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});*/		//example