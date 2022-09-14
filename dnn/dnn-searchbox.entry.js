import { r as registerInstance, e as createEvent, h, f as Host } from './index-b89da9ee.js';
import { D as Debounce } from './debounce-06f55268.js';

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
const DnnSearchbox = class {
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
      h("button", { class: "svg clear", onClick: () => this.query = "" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, h("path", { d: "M0 0h24v24H0z", fill: "none" }), h("path", { d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" })))
      :
        h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, h("path", { d: "M0 0h24v24H0z", fill: "none" }), h("path", { d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" }))));
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

//# sourceMappingURL=dnn-searchbox.entry.js.map