var player;
var fList = [];
socket = io.connect('http://localhost:43343');

function setup() {
    createCanvas(800, 800);
    player = new player(width/2,height/2, 20);

    var c = 0;
    while(c < 20){
        fList[c] = new food(random(width), random(height), 10);
        c += 1;
    }
}


function draw() {
    background(0);

    translate(width/2, height/2);
    translate(-player.pos.x, -player.pos.y);


    var c = 0;
    while(c < fList.length){
        fList[c].show();

        if(player.eats(fList[c])){
            fList.splice(c, 1)
        }
        c += 1;
    }

    player.show();
    player.update();

}