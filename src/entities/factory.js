import Polyline from './polyline';

export default class Factory {
    constructor(rawData, canvas) {
        this._rawData = rawData;
        this._canvas = canvas;
    }

    create() {
        const { types, colors, columns } = this._rawData;
        const lineIds = Object.keys(types).reduce((ids, id) => {
            if (types[id] === 'line') {
                ids.push(id);
            }

            return ids;
        }, []);

        return lineIds.reduce((polylines, id) => {
            const nodes = columns.find(c => c[0] === id).filter(n => Number.isInteger(n));
            const color = colors[id];
            const lineWidth = 2;

            const polilyne = new Polyline(this._canvas, lineWidth, color, nodes);

            polylines.push(polilyne);

            return polylines;
        }, []);
    }
}
