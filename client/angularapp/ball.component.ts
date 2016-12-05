import {Component, Output, EventEmitter, Input} from "@angular/core";
import Ball from "../corelogic/ball";
import './img/ball.jpg';
import './img/ball-selected.jpg';

@Component({
    selector: 'ball',
    template: `<div class="ball-wrapper" (click)="setAsHeaviest()">
                 <img *ngIf="isNotHeaviest()" src="img/ball.jpg" alt="ball" />
                 <img *ngIf="isHeaviest()" src="img/ball-selected.jpg" alt="heaviest ball" />
                 <div class="label">{{ball.position}}</div>
               </div>`
})
export class BallComponent {

    @Input() ball: Ball;
    @Output() selected: EventEmitter<Ball> = new EventEmitter();

    setAsHeaviest() {
        this.selected.emit(this.ball);
    }

    isNotHeaviest() {
        return !this.isHeaviest();
    }

    isHeaviest() {
        return this.ball.heaviest;
    }

}