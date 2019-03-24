import * as styles from './x-axis.scss';

export default class XAxisComponent extends HTMLElement {
  constructor() {
    super();
    this._init();
  }

  set chart(value) {
    this._chart = value;
    this._renderGrades();
    this._updateLabels();
  }

  get chart() {
    return this._chart;
  }

  set graphPreviewBounds(event) {
    this._updateLabels();
  }

  _init() {
    this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');

    style.textContent = styles[0][1];
    this.shadowRoot.appendChild(style);
  }

  _renderGrades() {
    this.gradeList = [];

    for (let i = 0; i < this.chart.xAxis.length; i++) {
      const grade = document.createElement('div');

      this.shadowRoot.appendChild(grade);
      this.gradeList.push(grade);
    }

    this.gradeList.reverse();
  }

  _updateLabels() {
    this.chart.xAxis.forEach((date, i) => {
      this.gradeList[i].textContent = date;
    });
  }
}
