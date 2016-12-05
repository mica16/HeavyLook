export default class Ball {

    constructor(private _position: number, private _heaviest: boolean = false) {
    }

    get heaviest(): boolean {
        return this._heaviest;
    }


    get position(): number {
        return this._position;
    }
}