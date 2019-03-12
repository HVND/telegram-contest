export class Chart {
  constructor(graphs, extrema) {
    this.graphs = graphs;
    this.extrema = extrema;
  }
}

export class Graph {
  constructor(nodes, color, name) {
    this.nodes = nodes;
    this.color = color;
    this.name = name;
  }
}
