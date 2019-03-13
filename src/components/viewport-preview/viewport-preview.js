import * as styles from './viewport-preview.scss';
import ViewportPreviewManager from './viewport-preview-manager';

export default class ViewportPreviewComponent extends HTMLElement {
  constructor() {
    super();
    this._init();
    this.defaultOptions = {
      minWidth: 20, // in percentages
    };
  }

  disconnectedCallback() {
    if (this.viewportPreviewManager) {
      this.viewportPreviewManager.dispose();
    }
  }

  _init() {
    this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    const startBorder = document.createElement('div');
    const endBorder = document.createElement('div');

    style.textContent = styles[0][1];
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(startBorder);
    this.shadowRoot.appendChild(endBorder);

    this.viewportPreviewManager = new ViewportPreviewManager(this, startBorder, endBorder);
    this.viewportPreviewManager.init();
  }

  _dispatchBoundsChangeEvent() {
    const event = new CustomEvent('boundsChange', { detail: {} });

    elem.dispatchEvent(event);
  }
}
