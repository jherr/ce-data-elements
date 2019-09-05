//https://gist.github.com/franktopel/5d760330a936e32644660774ccba58a7
class HTMLBaseElement extends HTMLElement {
  constructor() {
    super();
    this.parsed = false; // guard to make it easy to do certain stuff only once
    this.parentNodes = [];
  }

  setup() {
    // collect the parentNodes
    let el = this;
    while (el.parentNode) {
      el = el.parentNode;
      this.parentNodes.push(el);
    }
    // check if the parser has already passed the end tag of the component
    // in which case this element, or one of its parents, should have a nextSibling
    // if not (no whitespace at all between tags and no nextElementSiblings either)
    // resort to DOMContentLoaded or load having triggered
    if ([this, ...this.parentNodes].some(el=> el.nextSibling) || document.readyState !== 'loading') {
      this.childrenAvailableCallback();
    } else {
      this.mutationObserver = new MutationObserver(() => {
        if ([this, ...this.parentNodes].some(el=> el.nextSibling) || document.readyState !== 'loading') {
          this.childrenAvailableCallback();
          this.mutationObserver.disconnect();
        }
      });

      this.mutationObserver.observe(this, {childList: true});
    }
  }
}
