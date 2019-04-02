var player;
var fList = [];
socket = io.connect('http://localhost:43343');

function setup() {
    createCanvas(800, 800);
    player = new player(width/2,height/2, 20);

    for(var i=0; i<10; i++){
        fList[i] = new food(random(0, 800), random(0, 800), 10);
    }
}


function draw() {
    background(0);

    translate(width/2, height/2);
    translate(-player.pos.x, -player.pos.y);

    player.show();
    player.update();

    for(var i=0; i<fList.length; i++){
        fList[i].show();
    }

}