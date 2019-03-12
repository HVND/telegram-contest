import * as styles from './graph-view.scss';
import * as input from '../../chart_data.json';
import { ChartBuilder } from '../../chart-builder';

export default class GraphViewComponent extends HTMLElement {
  constructor() {
    super();
    this._init();
  }

  _init() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');

    style.textContent = styles[0][1];
    shadowRoot.appendChild(style);

    const chart = new ChartBuilder().build(input.default[0]);

    for (let i = 0; i < 5; i++) {
      const line = document.createElement('graph-line');

      shadowRoot.appendChild(line);
    }
  }
}
