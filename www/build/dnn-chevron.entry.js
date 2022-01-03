import { r as registerInstance, e as createEvent, h, f as Host } from './index-2143f95b.js';

const chevronRightIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>`;

const dnnChevronCss = ":host{display:inline-block}button{border:none;padding:0px;margin:0px;min-width:15px;min-height:15px;display:flex;justify-content:center;align-items:center;background-color:transparent;outline:none}svg{height:2em;width:2em;transition:all 300ms ease-in-out}button:focus svg,button:hover svg{color:var(--dnn-color-primary)}:host([expanded]) svg{transform:rotate(90deg)}";

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
    return (h(Host, null, h("button", { "aria-label": this.expanded ? this.collapseText : this.expandText, onClick: () => this.expanded = !this.expanded }, h("div", { innerHTML: chevronRightIcon }))));
  }
  static get watchers() { return {
    "expanded": ["handleExpandedChanged"]
  }; }
};
DnnChevron.style = dnnChevronCss;

export { DnnChevron as dnn_chevron };

//# sourceMappingURL=dnn-chevron.entry.js.map