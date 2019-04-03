describe('Testing eat food', function() {
    it('makes the player radius bigger after eating', function () {
        const players = new Player(width/2, height/2, 20);
        const foods = new food(width/2, height/2, 5);
        players.eatFood(foods);
        expect(players.radius).toBe(20.25)
        
    })
});

describe('placeholder', function () {
    it("passes", function () {
        expect(true).toBe(true);
    })
});
