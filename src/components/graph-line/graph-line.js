import * as styles from './graph-line.scss';

export default class GraphLineComponent extends HTMLElement {
  constructor() {
    super();
    this._init();
  }

  set line(value) {
    this._line = value;
    this._renderLine();
  }

  get line() {
    return this._line;
  }

  _init() {
    this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');

    style.textContent = styles[0][1];
    this.shadowRoot.appendChild(style);
  }

  _renderLine() {
    if (!this.svgEl) {
      this.svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      this.lineEl = document.createElementNS('http://www.w3.org/2000/svg', 'line');

      this.svgEl.appendChild(this.lineEl);
      this.shadowRoot.appendChild(this.svgEl);
    }

    this.lineEl.setAttribute('stroke', this.line.color);
    this.lineEl.setAttribute('stroke-width', 2);
    this.lineEl.setAttribute('stroke-linecap', 'round');

    this._updateLineDirection();
    this._updateLinePaddings();
  }

  _updateLineDirection() {
    const isIncrease = this.line.startPoint <= this.line.endPoint;

    if (isIncrease) {
      this.lineEl.setAttribute('x1', '0%');
      this.lineEl.setAttribute('x2', '100%');
      this.lineEl.setAttribute('y1', '100%');
      this.lineEl.setAttribute('y2', '0%');
    } else {
      this.lineEl.setAttribute('x1', '0%');
      this.lineEl.setAttribute('x2', '100%');
      this.lineEl.setAttribute('y1', '0%');
      this.lineEl.setAttribute('y2', '100%');
    }
  }

  _updateLinePaddings() {
    const height = 150;
    const top =
      this.line.startPoint < this.line.endPoint ? this.line.endPoint : this.line.startPoint;
    const bottom =
      this.line.startPoint < this.line.endPoint ? this.line.startPoint : this.line.endPoint;
    const paddingTop = height - (top * height) / this.line.extrema;
    const paddingBottom = (bottom * height) / this.line.extrema;

    this.svgEl.style.paddingTop = paddingTop + 'px';
    this.svgEl.style.paddingBottom = paddingBottom + 'px';
  }
}
