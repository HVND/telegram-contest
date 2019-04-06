import Shape from './shape';
import Point from './point';

export default class Polyline extends Shape {
    constructor(canvas, lineWidth, strokeStyle, nodes) {
        super(canvas, lineWidth, strokeStyle);

        if (nodes) {
            this.nodes = nodes;
        }
    }

    get nodes() {
        return this.state.nodes;
    }

    set nodes(value) {
        this.state = {
            nodes: value,
        };
    }

    render() {
        const points = this._convertNodesToPoints();

        this._canvas._context.strokeStyle = this._strokeStyle;
        this._canvas._context.lineWidth = this._lineWidth;
        this._canvas._context.beginPath();
        this._canvas._context.moveTo(0, points[0].y);

        for (let i = 1; i < points.length; i++) {
            this._canvas._context.lineTo(points[i].x, points[i].y);
        }

        this._canvas._context.stroke();
    }

    _convertNodesToPoints() {
        const extrema = Math.max(...this._canvas._polylines.reduce((allNodes, {nodes}) => {
            return [
                ...allNodes,
                ...nodes,
            ];
        }, []));

        return this.nodes.map((node, index) => {
            const x = ((index + 1) * this._canvas._width) / this.nodes.length;
            const y = this._canvas._height - (node * this._canvas._height / extrema);

            return new Point(x, y);
        });
    }
}
