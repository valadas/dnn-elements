import { r as registerInstance, e as createEvent, h, f as Host, g as getElement } from './index-28b3c571.js';
import { D as Debounce } from './debounce-8cdbd2fb.js';

const dnnCollapsibleCss = ":host{display:block}:host #container{height:0;overflow:hidden;transition:height 300ms ease-in-out}";

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
let DnnCollapsible = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.dnnCollapsibleHeightChanged = createEvent(this, "dnnCollapsibleHeightChanged", 7);
    /** Defines if the panel is expanded or not. */
    this.expanded = false;
    /** Defines the transition time in ms, defaults to 300ms */
    this.transitionDuration = 300;
    this.animating = false;
  }
  handleExpandedChanged(newValue) {
    this.animating = true;
    setTimeout(() => {
      const container = this.el.shadowRoot.querySelector("#container");
      if (newValue) {
        container.style.height = container.scrollHeight + "px";
      }
      else {
        container.style.height = "0px";
      }
    }, 0);
    setTimeout(() => {
      this.animating = false;
      this.dnnCollapsibleHeightChanged.emit();
    }, this.transitionDuration);
  }
  /** Updates the component height, use to update after a slot content changes. */
  async updateSize() {
    this.updateComponentSize();
  }
  updateComponentSize() {
    if (this.expanded) {
      this.animating = true;
      setTimeout(() => {
        const container = this.el.shadowRoot.querySelector("#container");
        let newHeight = 0;
        container.querySelector('slot').assignedElements().forEach(node => {
          newHeight += node.scrollHeight;
        });
        container.style.height = newHeight + "px";
      }, this.transitionDuration);
    }
  }
  handleOtherCollapsibleHeightChanged() {
    setTimeout(() => {
      this.updateComponentSize();
    }, this.transitionDuration);
  }
  handleMutation(mutationList) {
    mutationList.forEach(mutation => {
      setTimeout(() => {
        mutation.target.closest('dnn-collapsible').updateSize();
      }, this.transitionDuration);
    });
  }
  componentWillLoad() {
    this.mutationObserver = new MutationObserver((mutationList) => {
      this.handleMutation(mutationList);
    });
  }
  componentDidLoad() {
    const container = this.el.shadowRoot.querySelector('#container');
    container.style.transitionDuration = this.transitionDuration + 'ms';
    // Monitor for content changes and update own height
    const childNodes = [this.el];
    childNodes.forEach(element => {
      this.mutationObserver.observe(element, { attributes: true, characterData: true, childList: true, subtree: true });
    });
    const slot = this.el.shadowRoot.querySelector('slot');
    slot.addEventListener("slotchange", () => {
      this.updateSize();
    });
  }
  disconnectedCallback() {
    this.mutationObserver.disconnect();
  }
  /*eslint-enable @stencil/own-methods-must-be-private */
  render() {
    return (h(Host, null, h("div", { id: "container" }, h("slot", null))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "expanded": ["handleExpandedChanged"]
  }; }
};
__decorate([
  Debounce()
], DnnCollapsible.prototype, "updateSize", null);
DnnCollapsible.style = dnnCollapsibleCss;

export { DnnCollapsible as dnn_collapsible };
