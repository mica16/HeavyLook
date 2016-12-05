import Ball from "./ball";

export interface BallsGeneratorInterface {
    withSameWeight(): Array<Ball>;
    withHeaviest(heaviestBallPosition: number): Array<Ball>;
}

export default class BallsGenerator implements BallsGeneratorInterface {

    withSameWeight(): Array<Ball> {
        return this.generate(-1);
    }

    withHeaviest(heaviestBallPosition: number) {
        return this.generate(heaviestBallPosition);
    }

    private generate(heaviestBallPosition: number) {
        let balls = [];
        for (let i = 1; i <= 8; i++)
            balls.push(new Ball(i, i == heaviestBallPosition));
        return balls;
    }

}