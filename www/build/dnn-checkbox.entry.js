import { r as registerInstance, e as createEvent, h, f as Host, g as getElement } from './index-2143f95b.js';

const dnnCheckboxCss = ":host{--focus-color:var(--dnn-color-primary, #3792ED);display:inline-flex;align-items:center;gap:0.25rem;margin:3px}button{background-color:transparent;border:0;padding:0;margin:0;outline:none;display:flex;justify-content:center;align-items:center}button svg.undefined{opacity:0.45}button:focus{box-shadow:0 0 2px 2px var(--focus-color)}";

let DnnCheckbox = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.checkedchange = createEvent(this, "checkedchange", 7);
    /** Defines if the checkbox is checked (true) or unchecked (false) or in an intermediate state (undefined) */
    this.checked = false;
    /** Defines if clicking the checkbox will go through the intermediate state between checked and unchecked (tri-state) */
    this.useIntermediate = false;
  }
  changeState() {
    if (!this.useIntermediate) {
      this.checked = !this.checked;
      this.emitEvents();
      return;
    }
    if (this.checked === true) {
      this.checked = undefined;
      this.button.classList.add("undefined");
      this.emitEvents();
      return;
    }
    if (this.checked === undefined) {
      this.checked = false;
      this.button.classList.remove("undefined");
      this.emitEvents();
      return;
    }
    if (this.checked === false) {
      this.checked = true;
      this.button.classList.remove("undefined");
      this.emitEvents();
      return;
    }
  }
  emitEvents() {
    this.checkedchange.emit(this.checked);
  }
  render() {
    return (h(Host, null, h("button", { class: "icon", onClick: () => this.changeState(), ref: el => this.button = el }, this.checked === false &&
      h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, h("path", { d: "M0 0h24v24H0z", fill: "none" }), h("path", { d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" })), this.checked === true &&
      h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, h("path", { d: "M0 0h24v24H0z", fill: "none" }), h("path", { d: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" })), this.checked === undefined &&
      h("svg", { class: "undefined", xmlns: "http://www.w3.org/2000/svg", "enable-background": "new 0 0 24 24", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, h("g", null, h("rect", { fill: "none", height: "24", width: "24" })), h("g", null, h("g", null, h("g", null, h("path", { d: "M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M17,13H7v-2h10V13z" })))))), h("label", { htmlFor: this.el.id, onClick: () => this.changeState() }, h("slot", null))));
  }
  get el() { return getElement(this); }
};
DnnCheckbox.style = dnnCheckboxCss;

export { DnnCheckbox as dnn_checkbox };

//# sourceMappingURL=dnn-checkbox.entry.js.map