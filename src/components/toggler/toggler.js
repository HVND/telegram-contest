import * as styles from './toggler.scss';

export default class TogglerComponent extends HTMLElement {
  constructor() {
    super();
    this._init();
  }

  set graph(value) {
    this._graph = value;
    this._renderToogler();
  }

  get graph() {
    return this._graph;
  }

  get options() {
    return {
      color: this.graph.lines[0].color,
      name: this.graph.lines[0].name,
    };
  }

  get checked() {
    return this.inputEl.checked;
  }

  _init() {
    this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');

    style.textContent = styles[0][1];
    this.shadowRoot.appendChild(style);
  }

  _renderToogler() {
    const { name, color } = this.options;

    this.containerEl = document.createElement('label');
    this.inputEl = document.createElement('input');
    this.checkmarkEl = document.createElement('div');
    this.labelEl = document.createElement('div');

    this.inputEl.setAttribute('type', 'checkbox');
    this.inputEl.setAttribute('checked', 'checked');
    this.containerEl.setAttribute('class', 'container');
    this.checkmarkEl.setAttribute('class', 'checkmark');
    this.labelEl.setAttribute('class', 'name');
    requestAnimationFrame(() => (this.checkmarkEl.style.background = color));
    this.labelEl.textContent = name;

    this.containerEl.appendChild(this.labelEl);
    this.containerEl.appendChild(this.inputEl);
    this.containerEl.appendChild(this.checkmarkEl);
    this.shadowRoot.appendChild(this.containerEl);
  }
}
