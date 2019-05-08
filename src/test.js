describe("testing", function() {

    it("eat player 1", function() {

        var player1 = new Player(0,0,100,0,0,0);
        var player2 = new Player(0,0,99,0,0,0);

        var a = player1.eatPlayers(player2.vec, player2.rad);

        expect(a).toBe(true);

        var b = player2.eatPlayers(player1.vec, player1.rad);

        expect(b).toBe(false);

    });
});