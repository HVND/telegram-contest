import Factory from './factory';
import * as input from '../chart_data.json';

export default class Canvas {
    constructor(width, height, yAxisHeight, chartPreviewHeight, appendToElement) {
        this._width = width;
        this._height = height;
        this._yAxisHeight = yAxisHeight;
        this._chartPreviewHeight = chartPreviewHeight;
        this._appendToElement = appendToElement;
    }

    connect() {
        const canvas = this._canvasElement = document.createElement('canvas');
        this._context = canvas.getContext('2d');

        canvas.width = this._width;
        canvas.height = this._height;

        this._appendToElement.appendChild(canvas);
        this._createPolylines();
        this._renderEntities();
    }

    _createPolylines() {
        this._polylines = new Factory(input.default[4], this).create();
    }

    _renderEntities() {
        this._polylines.forEach(p => p.render());
    }

    get _chartViewBox() {
        return {
            x: 0,
            y: 0,
            width: this._width,
            height: this._height - this._yAxisHeight,
        };
    }

    get _chartPreviewViewBox() {
        return {
            x: 0,
            y: this._height - this._chartPreviewHeight,
            width: this._width,
            height: this._chartPreviewHeight,
        };
    }

    get _yAxisViewBox() {
        return {
            x: 0,
            y: this._height - this._chartPreviewHeight - this._yAxisHeight,
            width: this._width,
            height: this._yAxisHeight,
        };
    }
}
