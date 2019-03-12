export class Chart {
  constructor(graphs) {
    this.graphs = graphs;
  }
}

export class Graph {
  constructor(nodes, lines) {
    this.nodes = nodes;
    this.lines = lines;
  }
}

export class Line {
  constructor(startPoint, endPoint, color, name, extrema) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.color = color;
    this.name = name;
    this.extrema = extrema || null;
  }
}
