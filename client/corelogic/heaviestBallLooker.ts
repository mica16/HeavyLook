import Ball from "./ball";
import * as _ from "lodash";
import {Injectable} from "@angular/core";

export interface HeaviestBallLookerInterface {
    lookUp(balls: Array<Ball>): Result;
}

export class Result {
    constructor(private _iterations: number, private _heaviestBallPosition: number) {
    }

    get iterations(): number {
        return this._iterations;
    }

    get heaviestBallPosition(): number {
        return this._heaviestBallPosition;
    }
}

export class HeaviestBallLooker implements HeaviestBallLookerInterface {

    lookUp(balls: Array<Ball>): Result {
        let chunks = this.splitBallsIn3Groups(balls);
        let weight = this.weigh(chunks[0], chunks[1]);
        if (this.hasHeaviestAtLeft(weight))
            return new Result(2, this.determineHeaviestInSubGroup(chunks[0]));
        if (this.hasHeaviestAtRight(weight))
            return new Result(2, this.determineHeaviestInSubGroup(chunks[1]) + 3);
        let lastWeight = this.weigh([chunks[2][0]], [chunks[2][1]]);
        if(this.hasHeaviestAtLeft(lastWeight))
            return new Result(2, 7);
        if(this.hasHeaviestAtRight(lastWeight))
            return new Result(2, 8);
        return new Result(2, -1);
    }

    private splitBallsIn3Groups(balls: Array<Ball>) {
        return _.chunk(balls, 3);
    }


    private weigh(leftBalls: Array<Ball>, rightBalls: Array<Ball>): number {
        if(this.hasHeaviestBall(leftBalls))
            return 1;
        if (this.hasHeaviestBall(rightBalls))
            return -1;
        return 0;
    }

    private hasHeaviestAtLeft(weight: number) {
        return weight == 1;
    }

    private hasHeaviestAtRight(weight: number) {
        return weight == -1;
    }

    private hasHeaviestBall(balls: Array<Ball>): boolean{
        return _.filter(balls, ball => {
                return ball.heaviest;
            }).length == 1
    }

    private determineHeaviestInSubGroup(ballsSubGroup: Array<Ball>): number {
        let weight = this.weigh([ballsSubGroup[0]], [ballsSubGroup[1]]);
        if(this.hasHeaviestAtLeft(weight))
            return 1;
        if(this.hasHeaviestAtRight(weight))
            return 2;
        else
            return 3;
    }

}