import { Chart, Graph } from './chart';

export class ChartBuilder {
  build(rawInput) {
    const graphs = this._computeGraphs(rawInput);
    const extrema = this._findExtrema(graphs);

    return new Chart(graphs, extrema);
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

    return graphIds.reduce((graphs, id) => {
      const nodes = columns.find(c => c[0] === id).filter(n => Number.isInteger(n));
      const name = names[id];
      const color = colors[id];

      const graph = new Graph(nodes, color, name);

      graphs.push(graph);

      return graphs;
    }, []);
  }
}
