import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import Ball from "../corelogic/ball";
import BallsGenerator from "../corelogic/ballsGenerator";

@Component({
    selector: 'balls',
    template: `<ul>
                 <li *ngFor="let ball of balls">
                   <ball [ball]="ball" (selected)="generateHeaviestBall($event)"></ball>
                 </li>
               </ul>`
})
export class Balls implements OnInit {

    balls: Array<Ball>;
    @Output() ballSelected: EventEmitter<Array<Ball>> = new EventEmitter();
    @Output() reseted: EventEmitter<Array<Ball>> = new EventEmitter();

    constructor(private ballsGenerator: BallsGenerator) {
    }

    ngOnInit() {
        this.generateBalls();
    }

    generateHeaviestBall(heaviestBall: Ball) {
        this.balls = this.ballsGenerator.withHeaviest(heaviestBall.position);
        this.ballSelected.emit(this.balls);
    }

    reset() {
        this.generateBalls();
        this.reseted.emit();
    }

    private generateBalls() {
        this.balls = this.ballsGenerator.withSameWeight();
    }

}