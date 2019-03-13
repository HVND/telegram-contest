export default class ViewportPreviewManager {
  constructor(container, startBorder, endBorder) {
    this.container = container;
    this.startBorder = startBorder;
    this.endBorder = endBorder;
  }

  init() {
    this._registerListeners();
  }

  dispose() {}

  _registerListeners() {
    document.addEventListener('click', event => {
      const nodes = event.composedPath();
      const isContainer = nodes.indexOf(this.container) !== -1;
      const isStartBorder = nodes.indexOf(this.startBorder) !== -1;
      const isEndBorder = nodes.indexOf(this.endBorder) !== -1;

      if (isContainer && !isStartBorder & !isEndBorder) {
        debugger;
      }

      if (isStartBorder) {
        debugger;
      }

      if (isEndBorder) {
        debugger;
      }
    });
  }
}
