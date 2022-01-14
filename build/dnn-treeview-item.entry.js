import { r as registerInstance, h, f as Host, g as getElement } from './index-2143f95b.js';

const dnnTreeviewItemCss = ":host{display:flex;overflow:hidden}.expander{width:24px;height:24px}.expander button{transition:all 150ms ease-in-out;background-color:transparent;border:none;padding:0;margin:0;outline:none;height:1em;display:flex;justify-content:center;align-items:center;cursor:pointer;position:relative;top:2px}.expander button svg :first-child{transition:all 150ms ease-in-out;fill:white;stroke:black}.expander.expanded button{transform:rotate(45deg)}.expander.expanded button svg :first-child{fill:black;stroke:black}div.item .item-slot{display:flex;align-items:center;gap:0.25em}div.item div.children{overflow:hidden;height:0;transition:all 150ms ease-in-out}";

let DnnTreeviewItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /** Defines if the current node is expanded  */
    this.expanded = false;
    this.hasChildren = false;
  }
  componentDidLoad() {
    const children = this.childrenElement.children[0];
    const count = children.assignedElements().length;
    if (count > 0) {
      this.hasChildren = true;
    }
    if (this.expanded) {
      this.expander.classList.add("expanded");
      this.collapsible.expanded = false;
      setTimeout(() => {
        this.collapsible.expanded = true;
      }, 300);
    }
  }
  toggleCollapse() {
    this.expanded = !this.expanded;
    if (this.expanded) {
      this.expander.classList.add("expanded");
      return;
    }
    this.expander.classList.remove("expanded");
  }
  render() {
    return (h(Host, null, h("div", { class: "expander", ref: el => this.expander = el }, this.hasChildren &&
      h("button", { onClick: () => this.toggleCollapse() }, h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, h("path", { d: "M10 17l5-5-5-5v10z" }), h("path", { d: "M0 24V0h24v24H0z", fill: "none" })))), h("div", { class: "item" }, h("div", { class: "item-slot" }, h("slot", null)), h("dnn-collapsible", { ref: el => this.collapsible = el, expanded: this.expanded }, h("div", { ref: el => this.childrenElement = el }, h("slot", { name: "children" }))))));
  }
  get el() { return getElement(this); }
};
DnnTreeviewItem.style = dnnTreeviewItemCss;

export { DnnTreeviewItem as dnn_treeview_item };

//# sourceMappingURL=dnn-treeview-item.entry.js.map