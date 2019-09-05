class MyServiceProvider extends HTMLBaseElement {
  static get observedAttributes() {
    return ['url'];
  }

  constructor() {
    super()
    this._data = [];
    this.fetchData();
  }

  get url() {
    return this.getAttribute('url');
  }

  set url(url) {
    this.setAttribute('url', url);
    this.fetchData();
  }

  attributeChangedCallback(name) {
    if (name === 'url') {
      this.fetchData();
    }
  }

  fetchData() {
    if (this.url) {
      fetch(this.url)
        .then(resp => resp.json())
        .then(data => {
          this._data = data;
          this.updateData();
        });
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
      .forEach(el => el.data = this._data);
  }
}
window.customElements.define('my-service-provider', MyServiceProvider);
