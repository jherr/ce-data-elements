class MyMemoryProvider extends HTMLBaseElement {
  constructor(...args) {
    const self = super(...args)
    self._data = [];
    return self;
  }

  get data() {
    return this._data;
  }

  set data(data) {
    this._data = data;
    if (this.parsed) {
      this.updateData();
    }
  }

  connectedCallback() {
    super.setup();
  }

  childrenAvailableCallback() {
    this.parsed = true;
    this.updateData();
  }

  updateData() {
    [... this.childNodes]
      .filter(el => el.attributes !== undefined)
      .forEach(el => el.data = this.data);
  }
}
window.customElements.define('my-memory-provider', MyMemoryProvider);
