import { r as registerInstance, e as createEvent, h, f as Host } from './index-28b3c571.js';
import { D as Debounce } from './debounce-8cdbd2fb.js';

const dnnSearchboxCss = ":host{position:relative;display:flex;justify-content:space-between;--background-color:transparent;--color:#333;--border-size:1px;--border-color:grey;--border-active-color:black;--border-radius:var(--dnn-controls-radius, 5px);--padding:var(--dnn-controls-padding, 5px);--focus-color:var(--dnn-color-primary, blue)}:host input{width:100%;border:var(--border-size) solid var(--border-color);outline:none;border-radius:var(--border-radius);padding:var(--padding);padding-right:32px;transition:all 300ms ease-in-out}:host input:focus,:host input:hover{outline:none;box-shadow:0 0 2px 2px var(--focus-color)}:host svg{position:absolute;top:0;right:0;height:100%;transform:scale(0.7);fill:var(--color);outline:var(--color);color:var(--color);transition:all 300ms ease-in-out}:host button{background:transparent;border:0;margin:0;padding:0}:host button:focus svg,:host button:hover svg{fill:var(--focus-color);outline:var(--focus-color);color:var(--focus-color)}";

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let DnnSearchbox = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.queryChanged = createEvent(this, "queryChanged", 7);
    /**
     * Sets the field placeholder text.
     */
    this.placeholder = "";
    /**
     * Debounces the queryChanged by 500ms.
     */
    this.debounced = true;
    /** Sets the query */
    this.query = "";
  }
  fireQueryChanged() {
    if (this.debounced) {
      this.debouncedHandleQueryChanged();
    }
    else {
      this.handleQueryChanged();
    }
  }
  handleQueryChanged() {
    this.queryChanged.emit(this.query);
  }
  debouncedHandleQueryChanged() {
    this.handleQueryChanged();
  }
  render() {
    return (h(Host, null, h("input", { type: "text", value: this.query, placeholder: this.placeholder, onInput: e => this.query = e.target.value }), this.query !== "" ?
      h("button", { class: "svg clear", onClick: () => this.query = "" }, h("svg", { "aria-hidden": "true", focusable: "false", "data-prefix": "fas", "data-icon": "times-circle", class: "svg-inline--fa fa-times-circle fa-w-16", role: "img", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, h("path", { fill: "currentColor", d: "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z" })))
      :
        h("svg", { "aria-hidden": "true", focusable: "false", "data-prefix": "fas", "data-icon": "search", class: "svg-inline--fa fa-search fa-w-16", role: "img", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, h("path", { fill: "currentColor", d: "M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" }))));
  }
  static get watchers() { return {
    "query": ["fireQueryChanged"]
  }; }
};
__decorate([
  Debounce(500)
], DnnSearchbox.prototype, "debouncedHandleQueryChanged", null);
DnnSearchbox.style = dnnSearchboxCss;

export { DnnSearchbox as dnn_searchbox };
