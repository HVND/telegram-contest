export default class ViewportPreviewManager {
  constructor(containerEl, parentEl, startBorderEl, endBorderEl, options) {
    this.parentEl = parentEl;
    this.containerEl = containerEl;
    this.startBorderEl = startBorderEl;
    this.endBorderEl = endBorderEl;
    this.options = options;
  }

  init() {
    this._registerListeners();
  }

  dispose() {}

  _registerListeners() {
    document.addEventListener('mousedown', this._mousedownProcess.bind(this));
    document.addEventListener('touchstart', this._mousedownProcess.bind(this));
    document.addEventListener('mouseup', this._mouseupProcess.bind(this));
    document.addEventListener('touchend', this._mouseupProcess.bind(this));
    document.addEventListener('mousemove', this._mousemoveProcess.bind(this));
    document.addEventListener('touchmove', this._mousemoveProcess.bind(this));
    document.addEventListener('dragstart', () => false);
  }

  _mousedownProcess(e) {
    const nodes = e.composedPath();
    const isContainer = nodes.indexOf(this.containerEl) !== -1;
    const isStartBorder = nodes.indexOf(this.startBorderEl) !== -1;
    const isEndBorder = nodes.indexOf(this.endBorderEl) !== -1;

    if (isContainer && !isStartBorder & !isEndBorder) {
      this.containerTakenOptions = {
        shiftXLeft: e.pageX - this._getShiftCoords(this.containerEl).left,
        shiftXRight: e.pageX - this._getShiftCoords(this.containerEl).right,
      };
    }

    if (isStartBorder) {
      this.startBorderTakenOptions = {
        shiftX: e.pageX - this._getShiftCoords(this.startBorderEl).left,
      };
    }

    if (isEndBorder) {
      this.endBorderTakenOptions = {
        shiftX: e.pageX - this._getShiftCoords(this.endBorderEl).right,
      };
    }
  }

  _mouseupProcess() {
    this.containerTakenOptions = null;
    this.startBorderTakenOptions = null;
    this.endBorderTakenOptions = null;
  }

  _mousemoveProcess(e) {
    if (this.startBorderTakenOptions) {
      this._startBorderDraggingProcess(e, this.startBorderTakenOptions.shiftX);
    }

    if (this.endBorderTakenOptions) {
      this._endBorderDraggingProcess(e, this.endBorderTakenOptions.shiftX);
    }

    if (this.containerTakenOptions) {
      this._startBorderDraggingProcess(e, this.containerTakenOptions.shiftXLeft);
      this._endBorderDraggingProcess(e, this.containerTakenOptions.shiftXRight);
    }
  }

  _startBorderDraggingProcess(e, shiftX) {
    const pageX = e.touches ? e.touches[0].pageX : e.pageX;
    const { left, width } = this.parentEl.getBoundingClientRect();
    const x = ((pageX - shiftX - left) * 100) / width;

    const containerWidth = 100 - this._getRectInPercentages(this.containerEl).right - x;

    if (containerWidth < this.options.minWidth) {
      const { right } = this._getRectInPercentages(this.containerEl);

      this.containerEl.style.left = 100 - right - this.options.minWidth + '%';

      return;
    }

    if (x < 0) {
      this.containerEl.style.left = '0%';
    } else {
      this.containerEl.style.left = x + '%';
    }
  }

  _endBorderDraggingProcess(e, shiftX) {
    const pageX = e.touches ? e.touches[0].pageX : e.pageX;
    const { left, width } = this.parentEl.getBoundingClientRect();
    const x = 100 - ((pageX - shiftX - left) * 100) / width;

    const containerWidth = 100 - parseFloat(this.containerEl.style.left) - x;

    if (containerWidth < this.options.minWidth) {
      const { left } = this._getRectInPercentages(this.containerEl);

      this.containerEl.style.right = 100 - left - this.options.minWidth + '%';

      return;
    }

    if (x < 0) {
      this.containerEl.style.right = '0%';
    } else {
      this.containerEl.style.right = x + '%';
    }
  }

  _getShiftCoords(el) {
    const box = el.getBoundingClientRect();

    return {
      left: box.left + pageXOffset,
      right: box.right + pageXOffset,
    };
  }

  _getRectInPercentages(el) {
    const { left, right } = el.style;

    return {
      left: parseFloat(left),
      right: parseFloat(right),
    };
  }
}
