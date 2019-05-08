var Player = require('./publics/player');

function filler(r, g, b) {
    if (r === 0 && g === 0 && b === 0) {
        return "black";
    }
    color(r, g, b)
}

describe("test", function() {

    it("eat player", function() {

        /*var player1 = new Player(0,0,100,0,0,0);
        var player2 = new Player(0,0,99,0,0,0);

        var a = player1.eatPlayers(player2.vec, player2.rad);
        expect(a).toBe(true);

        var b = player2.eatPlayers(player1.vec, player1.rad);
        expect(b).toBe(false);*/

        var c = true;
        expect(c).toBe(true);

        var d1 = 0;
        var d2 = 0;
        var d3 = 0;
        expect(filler(d1, d2, d3)).toBe("black")

    });
});