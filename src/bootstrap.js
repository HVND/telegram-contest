import * as input from './chart_data.json';

input.default.forEach(c => {
  const chartShellEl = document.createElement('chart-shell');
  chartShellEl.chart = c;

  document.body.appendChild(chartShellEl);
});
