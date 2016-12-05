import {BallsGeneratorInterface, default as BallsGenerator} from "./ballsGenerator";
import Ball from "./ball";
describe('balls generator', () => {

    let ballsGenerator: BallsGeneratorInterface;

    beforeEach(() => {
        ballsGenerator = new BallsGenerator();
    });

    it('should withSameWeight 8 balls having the same weight', () => {
        let balls = ballsGenerator.withSameWeight();
        expect(balls.filter(b => b.heaviest)).toEqual([]);
    });

    it('should include heaviest ball in Xth position', () => {
        expect(ballsGenerator.withHeaviest(1).filter(b => b.heaviest)).toEqual([new Ball(1, true)]);
        expect(ballsGenerator.withHeaviest(2).filter(b => b.heaviest)).toEqual([new Ball(2, true)]);
        expect(ballsGenerator.withHeaviest(3).filter(b => b.heaviest)).toEqual([new Ball(3, true)]);
        expect(ballsGenerator.withHeaviest(4).filter(b => b.heaviest)).toEqual([new Ball(4, true)]);
        expect(ballsGenerator.withHeaviest(5).filter(b => b.heaviest)).toEqual([new Ball(5, true)]);
        expect(ballsGenerator.withHeaviest(6).filter(b => b.heaviest)).toEqual([new Ball(6, true)]);
        expect(ballsGenerator.withHeaviest(7).filter(b => b.heaviest)).toEqual([new Ball(7, true)]);
        expect(ballsGenerator.withHeaviest(8).filter(b => b.heaviest)).toEqual([new Ball(8, true)]);
    });

});