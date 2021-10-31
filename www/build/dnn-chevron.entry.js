import { r as registerInstance, e as createEvent, h, f as Host } from './index-28b3c571.js';

const dnnChevronCss = ":host{display:inline-block}button{border:none;padding:0px;margin:0px;min-width:15px;min-height:15px;display:flex;justify-content:center;align-items:center;background-color:transparent;outline:none}svg{height:1em;transition:all 300ms ease-in-out}button:focus svg,button:hover svg{color:var(--dnn-color-primary)}:host([expanded]) svg{transform:rotate(90deg)}";

let DnnChevron = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.changed = createEvent(this, "changed", 7);
    /** Expand text for screen readers */
    this.expandText = "expand";
    /** Collapse text for screen readers */
    this.collapseText = "collapse";
    /** Is the chevron expanded */
    this.expanded = false;
  }
  handleExpandedChanged(newValue) {
    this.changed.emit(newValue);
  }
  render() {
    return (h(Host, null, h("button", { "aria-label": this.expanded ? this.collapseText : this.expandText, onClick: () => this.expanded = !this.expanded }, h("svg", { "aria-hidden": "true", focusable: "false", "data-prefix": "fas", "data-icon": "chevron-right", class: "svg-inline--fa fa-chevron-right fa-w-10", role: "img", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 320 512" }, h("path", { fill: "currentColor", d: "M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" })))));
  }
  static get watchers() { return {
    "expanded": ["handleExpandedChanged"]
  }; }
};
DnnChevron.style = dnnChevronCss;

export { DnnChevron as dnn_chevron };

//# sourceMappingURL=dnn-chevron.entry.js.map