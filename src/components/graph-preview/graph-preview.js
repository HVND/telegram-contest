import * as styles from './graph-preview.scss';

export default class GraphPreviewComponent extends HTMLElement {
  constructor() {
    super();
    this._init();
  }

  set chart(value) {
    this._chart = value;
    this._renderGraphs();
  }

  get chart() {
    return this._chart;
  }

  set rerender(value) {
    this.graphViewList.forEach(g => (g.rerender = value));
  }

  connectedCallback() {
    const height = this.offsetHeight;
    this.viewportPreviewEl.addEventListener('boundsChange', ({ detail }) => {
      this._dispatchBoundsChangeEvent(detail);
      this._updateBackdropBounds(detail);
    });
    this.graphViewList.forEach(g => (g.height = height));
  }

  _dispatchBoundsChangeEvent(detail) {
    const event = new CustomEvent('boundsChange', { detail });

    this.dispatchEvent(event);
  }

  _init() {
    this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    this.viewportPreviewEl = document.createElement('viewport-preview');
    this.viewportPreviewEl.parentEl = this;

    style.textContent = styles[0][1];
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(this.viewportPreviewEl);

    this._renderBackdrop();
  }

  _renderGraphs() {
    this.graphViewList = [];

    this.chart.graphs.forEach(g => {
      const graphView = document.createElement('graph-view');
      graphView.graph = g;

      this.shadowRoot.appendChild(graphView);
      this.graphViewList.push(graphView);
    });
  }

  _renderBackdrop() {
    this.startBackdropEl = document.createElement('div');
    this.endBackdropEl = document.createElement('div');

    this.shadowRoot.appendChild(this.startBackdropEl);
    this.shadowRoot.appendChild(this.endBackdropEl);
  }

  _updateBackdropBounds({ left, right }) {
    this.startBackdropEl.style.left = '0%';
    this.startBackdropEl.style.right = 100 - left + '%';

    this.endBackdropEl.style.right = '0%';
    this.endBackdropEl.style.left = 100 - right + '%';
  }
}
