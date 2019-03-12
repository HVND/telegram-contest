import * as styles from './graph-line.scss';

export default class GraphLineComponent extends HTMLElement {
  constructor() {
    super();
    this._init();
  }

  _init() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');

    style.textContent = styles[0][1];
    shadowRoot.appendChild(style);

    this._renderLine(shadowRoot);
  }

  _renderLine(shadowRoot) {
    this.lineContainerEl = document.createElementNS('http://www.w3.org/2000/div', 'div');
    this.svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    this.svgEl.innerHTML = `<line x1="0%" y1="0%" x2="100%" y2="100%" stroke="black" />`;
    this.lineEl = this.svgEl.getElementsByTagName('line');
    this.lineContainerEl.appendChild(this.svgEl);

    shadowRoot.appendChild(this.svgEl);
  }

  static get observedAttributes() {
    return ['options'];
  }

  attributeChangedCallback(name, oldValue, newValue) {}
}
