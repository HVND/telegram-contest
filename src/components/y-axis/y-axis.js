import * as styles from './y-axis.scss';

export default class YAxisComponent extends HTMLElement {
  constructor() {
    super();
    this._init();
  }

  set chart(value) {
    this._chart = value;
    this._updateLabels();
  }

  get chart() {
    return this._chart;
  }

  set graphPreviewBounds(event) {
    this._updateLabels();
  }

  set rerender(value) {
    this._updateLabels();
  }

  _init() {
    this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');

    style.textContent = styles[0][1];
    this.shadowRoot.appendChild(style);
    this._renderGrades();
  }

  _renderGrades() {
    this.gradesCount = 6;
    this.gradeList = [];

    for (let i = 0; i < this.gradesCount; i++) {
      const grade = document.createElement('div');

      this.shadowRoot.appendChild(grade);
      this.gradeList.push(grade);
    }

    this.gradeList.reverse();
  }

  _updateLabels() {
    const extrema = this.chart.graphs[0].lines[0].extrema;
    const distonation = Math.floor(extrema / this.gradesCount);

    for (let i = 0, j = 0; i < extrema; i += distonation, j++) {
      if (this.gradeList[j]) {
        this.gradeList[j].textContent = i;
      }
    }
  }
}
