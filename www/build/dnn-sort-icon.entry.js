import { r as registerInstance, e as createEvent, h, f as Host } from './index-28b3c571.js';

const dnnSortIconCss = ":host{display:inline-block}button{outline:none;border:none;margin:0;padding:0;background-color:transparent;outline:none;display:inline-block;line-height:1em;position:relative;top:0.25em}button svg{height:1.5em;width:auto;fill:var(--color, #888)}button.active svg{fill:var(--color-sorted, var(--dnn-color-primary, #028bff))}button:hover svg,button:focus svg{fill:var(--color-hover, var(--dnn-color-primary-light, #36a1ff))}";

let DnnSortIcon = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.sortChanged = createEvent(this, "sortChanged", 7);
    /** Defines the current sort direction */
    this.sortDirection = "none";
  }
  changeSort() {
    switch (this.sortDirection) {
      case "asc":
        this.sortDirection = "desc";
        break;
      case "desc":
        this.sortDirection = "asc";
        break;
      case "none":
        this.sortDirection = "asc";
        break;
      default:
        break;
    }
    this.sortChanged.emit(this.sortDirection);
  }
  render() {
    return (h(Host, null, h("button", { class: { "active": this.sortDirection != "none" }, onClick: () => this.changeSort() }, this.sortDirection == "none" &&
      h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 12 16" }, h("path", { d: "M 0 7 H 12 L 6 0 Z M 0 9 H 12 L 6 16 Z" })), this.sortDirection == "asc" &&
      h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 12 16" }, h("path", { d: "M 0 7 H 12 L 6 0 Z" })), this.sortDirection == "desc" &&
      h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 12 16" }, h("path", { d: "M 0 9 H 12 L 6 16 Z" })))));
  }
};
DnnSortIcon.style = dnnSortIconCss;

export { DnnSortIcon as dnn_sort_icon };
