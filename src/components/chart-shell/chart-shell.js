import * as styles from './chart-shell.scss';
import { ChartBuilder } from '../../chart-builder';

export default class ChartShellComponent extends HTMLElement {
  constructor() {
    super();
    this._init();
  }

  set chart(value) {
    this._chart = value;
    this._renderCharts();
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

  _renderCharts() {
    this.chartEl = document.createElement('chart-view');
    this.graphPreviewEl = document.createElement('graph-preview');
    this.togglersShellEl = document.createElement('togglers-shell');

    this.processedChart = new ChartBuilder().build(this.chart);
    this.chartEl.chart = this.processedChart;
    this.graphPreviewEl.chart = this.processedChart;
    this.togglersShellEl.chart = this.processedChart;

    this.shadowRoot.appendChild(this.chartEl);
    this.shadowRoot.appendChild(this.graphPreviewEl);
    this.shadowRoot.appendChild(this.togglersShellEl);

    this.graphPreviewEl.addEventListener(
      'boundsChange',
      ({ detail }) => (this.chartEl.graphPreviewBounds = detail),
    );

    this.togglersShellEl.addEventListener('togglersChange', () => this._triggerRerender());
  }

  _triggerRerender() {
    new ChartBuilder().assignExtrema(this.processedChart.graphs);
    this.chartEl.rerender = true;
    this.graphPreviewEl.rerender = true;
  }
}
