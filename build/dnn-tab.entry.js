import { r as registerInstance, h, f as Host } from './index-2143f95b.js';

const dnnTabCss = "";

let DnnTab = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.visible = false;
  }
  /** Shows the tab. */
  async show() {
    this.visible = true;
  }
  /** Hides the modal */
  async hide() {
    this.visible = false;
  }
  render() {
    return (h(Host, null, this.visible &&
      h("slot", null)));
  }
};
DnnTab.style = dnnTabCss;

export { DnnTab as dnn_tab };

//# sourceMappingURL=dnn-tab.entry.js.map