var player;

var zoom = 1;

function setup() {
    createCanvas(600, 600);
    player = new player(0, 0, 64);
}

function draw() {
    background(0);

    translate(width/2, height/2);
    var newzoom = 64 / player.r;
    zoom = lerp(zoom, newzoom, 0.1);
    scale(zoom);
    translate(-player.pos.x, -player.pos.y);

    blob.show();
    blob.update();

}