import { r as registerInstance, e as createEvent, h, f as Host, g as getElement } from './index-b89da9ee.js';

const dnnCollapsibleCss = ":host{display:block}#container{max-height:0;overflow:hidden;transition:max-height 300ms ease-in-out}";

const DnnCollapsible = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.dnnCollapsibleHeightChanged = createEvent(this, "dnnCollapsibleHeightChanged", 7);
    /** Defines if the panel is expanded or not. */
    this.expanded = false;
    /** Defines the transition time in ms, defaults to 150ms */
    this.transitionDuration = 150;
  }
  handleHeightChanged() {
    requestAnimationFrame(() => {
      this.updateSize();
    });
  }
  /**
   * Updates the component height, use to update after a slot content changes.
   */
  async updateSize() {
    if (this.expanded) {
      requestAnimationFrame(() => {
        this.container.style.maxHeight = `${this.container.scrollHeight}px`;
      });
      setTimeout(() => {
        this.container.style.maxHeight = "none";
      }, this.transitionDuration);
    }
  }
  handledExpandedChanged(expanded) {
    if (expanded) {
      this.updateSize();
    }
    else {
      requestAnimationFrame(() => {
        this.container.style.maxHeight = `${this.container.scrollHeight}px`;
        requestAnimationFrame(() => {
          this.container.style.maxHeight = "0px";
        });
      });
    }
    setTimeout(() => {
      requestAnimationFrame(() => {
        this.dnnCollapsibleHeightChanged.emit();
      });
    }, this.transitionDuration);
  }
  componentDidLoad() {
    this.container.style.transition = `max-height ${this.transitionDuration}ms ease-in-out`;
  }
  render() {
    return (h(Host, null, h("div", { id: "container", class: this.expanded && "expanded", ref: el => this.container = el, style: { transition: `max-height ${this.transitionDuration}ms ease-in-out` } }, h("slot", null))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "expanded": ["handledExpandedChanged"]
  }; }
};
DnnCollapsible.style = dnnCollapsibleCss;

export { DnnCollapsible as dnn_collapsible };

//# sourceMappingURL=dnn-collapsible.entry.js.map