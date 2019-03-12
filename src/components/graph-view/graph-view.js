import * as styles from './graph-view.scss';

export default class GraphViewComponent extends HTMLElement {
  constructor() {
    super();
    this._init();
  }

  set graph(value) {
    this._graph = value;
    this._renderLines();
  }

  get graph() {
    return this._graph;
  }

  _init() {
    this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');

    style.textContent = styles[0][1];
    this.shadowRoot.appendChild(style);
  }

  _renderLines() {
    this._graph.lines.forEach(l => {
      const line = document.createElement('graph-line');
      line.line = l;

      this.shadowRoot.appendChild(line);
    });
  }
}
