import { Chart, Graph, Line } from './chart';

export class ChartBuilder {
  build(rawInput) {
    const graphs = this._computeGraphs(rawInput);

    return new Chart(graphs);
  }

  _findExtrema(graphs) {
    const nodes = graphs.reduce((poins, { nodes }) => {
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

    this._assignExtrema(graphs);

    return graphs;
  }

  _computeLines(nodes, color, name) {
    const lines = [];

    for (let i = 0, j = 1; i < nodes.length - 2; i++, j++) {
      lines.push(new Line(nodes[i], nodes[j], color, name));
    }

    return lines;
  }

  _assignExtrema(graphs) {
    const extrema = this._findExtrema(graphs);

    graphs.map(({ lines }) => lines.forEach(l => (l.extrema = extrema)));
  }
}
