var player;
var fList = [];
socket = io.connect('http://localhost:43343');

function setup() {
    createCanvas(1200, 800);
    player = new Player(width/2,height/2, 20);
    var t = 0;
    while(t < 200){
        fList[t] = new food(random(width), random(height), 10);
        t += 1;
    }
}


function draw() {
    background(0);
    translate(width/2-player.pos.x, height/2-player.pos.y);
    var c = 0;
    for (c = fList.length - 1; c >= 0; c--) {
        fList[c].show();
        if(player.eats(fList[c])) {
            fList.splice(c, 1);
        }
    }

    player.show();
    player.update();

}