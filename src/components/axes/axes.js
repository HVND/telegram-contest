import * as styles from './axes.scss';

export default class AxesComponent extends HTMLElement {
  constructor() {
    super();
    this._init();
  }

  set chart(value) {
    this.yAxisEl.chart = value;
  }

  set graphPreviewBounds(event) {
    this.yAxisEl.graphPreviewBounds = event;
  }

  set rerender(value) {
    this.yAxisEl.rerender = value;
  }

  _init() {
    this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    this.yAxisEl = document.createElement('y-axis');

    style.textContent = styles[0][1];
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(this.yAxisEl);
  }
}
