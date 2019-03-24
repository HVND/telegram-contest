import * as styles from './viewport-preview.scss';
import ViewportPreviewManager from './viewport-preview-manager';

export default class ViewportPreviewComponent extends HTMLElement {
  constructor() {
    super();
    this._init();
  }

  disconnectedCallback() {
    if (this.viewportPreviewManager) {
      this.viewportPreviewManager.dispose();
    }
  }

  connectedCallback() {
    this.style.left = '40%';
    this.style.right = '40%';

    const startBorderEl = document.createElement('div');
    const endBorderEl = document.createElement('div');
    this.defaultOptions = {
      minWidth: 10, // in percentages
      dispatchBoundsChangeEvent: this._dispatchBoundsChangeEvent.bind(this),
    };

    this.viewportPreviewManager = new ViewportPreviewManager(
      this,
      this.parentEl,
      startBorderEl,
      endBorderEl,
      this.defaultOptions,
    );

    this.viewportPreviewManager.init();

    this.shadowRoot.appendChild(startBorderEl);
    this.shadowRoot.appendChild(endBorderEl);
  }

  set parentEl(value) {
    this._parentEl = value;
  }

  get parentEl() {
    return this._parentEl;
  }

  _init() {
    this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');

    style.textContent = styles[0][1];
    this.shadowRoot.appendChild(style);
  }

  _dispatchBoundsChangeEvent(detail) {
    const event = new CustomEvent('boundsChange', { detail });

    this.dispatchEvent(event);
  }
}
