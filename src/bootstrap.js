import { ChartBuilder } from './chart-builder';
import * as input from './chart_data.json';

document.addEventListener('DOMContentLoaded', () => {
  const chartEl = document.createElement('chart-view');
  const graphPreviewEl = document.createElement('graph-preview');
  const chart = new ChartBuilder().build(input.default[0]);
  chartEl.chart = chart;
  graphPreviewEl.chart = chart;

  document.body.appendChild(chartEl);
  document.body.appendChild(graphPreviewEl);
});
