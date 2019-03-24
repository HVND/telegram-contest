import { Chart, Graph, Line } from './chart';

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export class ChartBuilder {
  build(rawInput) {
    const graphs = this._computeGraphs(rawInput);
    const xAxis = this._computeXAxisValues(rawInput);

    return new Chart(graphs, xAxis);
  }

  assignExtrema(graphs) {
    const extrema = this._findExtrema(graphs);

    graphs.map(({ lines }) => lines.forEach(l => (l.extrema = extrema)));
  }

  _findExtrema(graphs) {
    const nodes = graphs
      .filter(({ lines }) => !lines[0].disabled)
      .reduce((poins, { nodes }) => {
        return [...poins, ...nodes];
      }, []);

    return Math.max(...nodes);
  }

  _computeGraphs({ types, names, colors, columns }) {
    const graphIds = Object.keys(types).reduce((ids, id) => {
      if (types[id] === 'line') {
        ids.push(id);
      }

      return ids;
    }, []);

    let graphs = graphIds.reduce((graphs, id) => {
      const nodes = columns.find(c => c[0] === id).filter(n => Number.isInteger(n));
      const name = names[id];
      const color = colors[id];

      const lines = this._computeLines(nodes, color, name);
      const graph = new Graph(nodes, lines);

      graphs.push(graph);

      return graphs;
    }, []);

    this.assignExtrema(graphs);

    return graphs;
  }

  _computeLines(nodes, color, name) {
    const lines = [];

    for (let i = 0, j = 1; i < nodes.length - 2; i++, j++) {
      lines.push(new Line(nodes[i], nodes[j], color, name));
    }

    return lines;
  }

  _computeXAxisValues({ types, columns }) {
    const column = Object.keys(types).find(type => type === 'x');

    return columns
      .find(c => c[0] === column)
      .reduce((dates, date) => {
        if (Number.isInteger(date)) {
          const d = new Date(date);
          const label = `${monthNames[d.getMonth()]} ${d.getDay() + 1}`;

          dates.push(label);
        }

        return dates;
      }, []);
  }
}
