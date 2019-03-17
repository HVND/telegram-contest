import * as styles from './chart.scss';

export default class ChartComponent extends HTMLElement {
  constructor() {
    super();
    this._init();
  }

  set chart(value) {
    this._chart = value;
    this._renderGraphs();
  }

  set graphPreviewBounds({ left, right, width }) {
    this.container.style.left = (left / width) * -100 + '%';
    this.container.style.right = (right / width) * -100 + '%';
  }

  get chart() {
    return this._chart;
  }

  _init() {
    this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');

    style.textContent = styles[0][1];
    this.shadowRoot.appendChild(style);
  }

  _renderGraphs() {
    this.container = document.createElement('div');

    this.chart.graphs.forEach(g => {
      const graphView = document.createElement('graph-view');
      graphView.graph = g;

      this.container.appendChild(graphView);
    });

    this.shadowRoot.appendChild(this.container);
  }
}
