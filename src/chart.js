export class Chart {
  constructor(graphs, xAxis) {
    this.graphs = graphs;
    this.xAxis = xAxis;
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
