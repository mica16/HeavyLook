import 'core-js/es6';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/router';
import {Component, NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {HeaviestBallLooker, Result} from "../corelogic/heaviestBallLooker";
import BallsGenerator from "../corelogic/ballsGenerator";
import {Balls} from "./balls.component";
import {BallComponent} from "./ball.component";
import Ball from "../corelogic/ball";
import './main.scss';
import './img/balance.jpg';

@Component({
    selector: 'heavy-look-app',
    template: `<div class="container">
                 <h1>HeavyLook</h1>
                 <balls #ballsComponent (ballSelected)="considerHeaviestBallSelection($event)" (reseted)="clearResult()"></balls>
                 <div class="balance-img-wrapper">
                       <img src="img/balance.jpg" alt="balance" />           
                 </div>
                 <div class="buttons">
                   <button class="execution-button" (click)="lookHeaviestBallUp()">Executer</button>
                   <button class="reset-button" (click)="ballsComponent.reset()">Reset</button> 
                 </div>
                 <div class="info">
                   <div class="result" *ngIf="result">
                    C\'est la boule {{result.heaviestBallPosition}} qui est 
                    la plus lourde ! Solution trouvée en {{result.iterations}} itérations.
                   </div>
                   <div class="warning" *ngIf="warning">
                      {{warning}}
                   </div>  
                 </div>
               </div>`
})
class HeavyLookApp {

    result: Result;
    balls: Array<Ball>;
    warning: string;
    private hasSelectedHeaviestBall: boolean;

    constructor(private heaviestBallLooker: HeaviestBallLooker) {
    }

    considerHeaviestBallSelection(balls: Array<Ball>) {
        this.balls = balls;
        this.hasSelectedHeaviestBall = true;
        this.result = null;
        this.warning = null;
    }

    lookHeaviestBallUp() {
        if (this.hasSelectedHeaviestBall)
            this.result = this.heaviestBallLooker.lookUp(this.balls);
        else
            this.warning = "Vous devez d'abord sélectionner la boule la plus lourde.";
    }

    clearResult() {
        this.result = null;
        this.warning = null;
        this.hasSelectedHeaviestBall = false;
    }

}

@NgModule({
    declarations: [
        HeavyLookApp,
        Balls,
        BallComponent
    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    bootstrap: [HeavyLookApp],
    providers: [BallsGenerator, HeaviestBallLooker]
})
export class HeavyLookAppModule {
}

platformBrowserDynamic().bootstrapModule(HeavyLookAppModule);