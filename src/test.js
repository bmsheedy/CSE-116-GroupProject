console.log("you can see me!");

socket = io.connect('http://localhost:63343');

var data = {
    x: "this be x",
    y: "this be y"
};
socket.emit('mouse', data);
socket.on('mouse', newTest);

function newTest(data) {
    console.log('received!');
}

socket.on('oncePerSecond',
    function(data) {
        console.log("you can see this!");
    }
);