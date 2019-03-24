import * as styles from './chart.scss';

export default class ChartComponent extends HTMLElement {
  constructor() {
    super();
    this._init();
  }

  set chart(value) {
    this._chart = value;
    this.axesViewEl.chart = value;
    this._renderGraphs();
  }

  set rerender(value) {
    this.graphViewList.forEach(g => (g.rerender = value));
    this.axesViewEl.rerender = value;
  }

  set graphPreviewBounds({ left, right, width }) {
    this.container.style.left = (left / width) * -100 + '%';
    this.container.style.right = (right / width) * -100 + '%';
    this.axesViewEl.graphPreviewBounds = { left, right, width };
  }

  get chart() {
    return this._chart;
  }

  connectedCallback() {
    const height = this.container.offsetHeight;
    this.graphViewList.forEach(g => (g.height = height));
  }

  _init() {
    this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    this.axesViewEl = document.createElement('axes-view');

    style.textContent = styles[0][1];
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(this.axesViewEl);
  }

  _renderGraphs() {
    this.graphViewList = [];
    this.container = document.createElement('div');
    // this.xAxis = document.createElement('x-axis');

    // this.xAxis.chart = this.chart;
    this.chart.graphs.forEach(g => {
      const graphView = document.createElement('graph-view');
      graphView.graph = g;

      this.container.appendChild(graphView);
      this.graphViewList.push(graphView);
    });

    // this.container.appendChild(this.xAxis);

    this.shadowRoot.appendChild(this.container);
  }
}
