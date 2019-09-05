class MyDataTable extends HTMLElement {
  constructor() {
    super();
    this._data = [];
  }

  get data() {
    return this._data;
  }

  set data(data) {
    this._data = data;
    this.updateTable();
  }

  updateTable() {
    this.innerHTML = '<table>' +
      this.data.map(row =>
        `<tr>${
          row.map(col => `<td>${col}</td>`).join('')
        }</tr>`
      ).join('') + '</table>';
  }
}
window.customElements.define('my-data-table', MyDataTable);
