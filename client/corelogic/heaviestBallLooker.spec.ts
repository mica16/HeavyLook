import Ball from "./ball";
import {HeaviestBallLookerInterface, HeaviestBallLooker, Result} from "./heaviestBallLooker";
describe('Heaviest ball looker', () => {

    let heaviestBallLooker: HeaviestBallLookerInterface;

    beforeEach(() => {
        heaviestBallLooker = new HeaviestBallLooker();
    });

    it('should return -1 if there is no heaviest', () => {
        expect(heaviestBallLooker.lookUp(generateBalls(-1))).toEqual(new Result(2, -1));
    });

    it('should return 1 if the heaviest is the first ball', () => {
        expect(heaviestBallLooker.lookUp(generateBalls(1))).toEqual(new Result(2, 1));
    });

    it('should return 2 if the heaviest is the second ball', () => {
        expect(heaviestBallLooker.lookUp(generateBalls(2))).toEqual(new Result(2, 2));
    });

    it('should return 3 if the heaviest is the third ball', () => {
        expect(heaviestBallLooker.lookUp(generateBalls(3))).toEqual(new Result(2, 3));
    });

    it('should return 4 if the heaviest is the fourth ball', () => {
        expect(heaviestBallLooker.lookUp(generateBalls(4))).toEqual(new Result(2, 4));
    });

    it('should return 5 if the heaviest is the fifth ball', () => {
        expect(heaviestBallLooker.lookUp(generateBalls(5))).toEqual(new Result(2, 5));
    });

    it('should return 6 if the heaviest is the sixth ball', () => {
        expect(heaviestBallLooker.lookUp(generateBalls(6))).toEqual(new Result(2, 6));
    });

    it('should return 7 if there are eight balls and the seventh is heavier', () => {
        expect(heaviestBallLooker.lookUp(generateBalls(7))).toEqual(new Result(2, 7));
    });

    it('should return 8 if the heaviest is the eighth ball', () => {
        expect(heaviestBallLooker.lookUp(generateBalls(8))).toEqual(new Result(2, 8));
    });

    function generateBalls(heaviest: number) {
        let balls = [];
        for (let i = 0; i < 8; i++)
            balls.push(new Ball(i, i == heaviest - 1))
        return balls;
    }

});