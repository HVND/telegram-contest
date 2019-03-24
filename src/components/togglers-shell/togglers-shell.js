import * as styles from './togglers-shell.scss';

export default class TogglersShellComponent extends HTMLElement {
  constructor() {
    super();
    this._init();
  }

  set chart(value) {
    if (value !== this._chart) {
      this._chart = value;
      this._renderToggles();
    }
  }

  get chart() {
    return this._chart;
  }

  connectedCallback() {
    this.addEventListener('click', e => {
      const nodes = e.composedPath();

      if (!(nodes[0] instanceof HTMLInputElement)) {
        return;
      }

      const targetToggler = nodes.some(n =>
        this.togglerViewList.some(({ containerEl }) => n === containerEl),
      );

      if (targetToggler) {
        this._updateDisabledState();
      }
    });
  }

  _updateDisabledState() {
    this.chart.graphs.forEach(g => {
      const { checked } = this.togglerViewList.find(({ graph }) => g === graph);

      g.lines.forEach(l => (l.disabled = !checked));
    });

    this._dispatchTogglersChangeEvent(this.chart);
  }

  _dispatchTogglersChangeEvent(detail) {
    const event = new CustomEvent('togglersChange', { detail });

    this.dispatchEvent(event);
  }

  _init() {
    this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');

    style.textContent = styles[0][1];
    this.shadowRoot.appendChild(style);
  }

  _renderToggles() {
    this.togglerViewList = [];

    this.chart.graphs.forEach(g => {
      const toggler = document.createElement('toggler-view');
      toggler.graph = g;

      this.togglerViewList.push(toggler);
      this.shadowRoot.appendChild(toggler);
    });
  }
}
