import State from './state';

export default class Shape extends State {
    constructor(canvas, lineWidth, strokeStyle) {
        super();
        this._canvas = canvas;
        this._lineWidth = lineWidth;
        this._strokeStyle = strokeStyle;
    }
}
