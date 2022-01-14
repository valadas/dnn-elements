import { r as registerInstance, e as createEvent, h, f as Host, g as getElement } from './index-2143f95b.js';

const dnnToggleCss = ":host{display:inline-block;outline:none;cursor:pointer}button{height:1.5em;width:2.5em;outline:none;background-color:var(--background, #888);border:0;border-radius:var(--border-radius, var(--dnn-controls-radius, 0.75em));padding:0.1em;position:relative;margin:0;transition:background-color 300ms ease-in-out;position:relative;cursor:pointer}button:hover,button:focus{box-shadow:0 0 2px 2px var(--dnn-color-primary)}button.checked{background-color:var(--background-checked, var(--dnn-color-primary, blue))}button.checked .handle{left:calc(1em + 4px)}button:disabled{opacity:0.5;cursor:not-allowed;box-shadow:none}button .handle{transition:all 300ms ease-in-out;background-color:white;width:1em;height:1em;border-radius:var(--dnn-controls-radius, 50%);position:absolute;top:calc(50% - 0.5em);left:2px}";

let DnnToggle = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.checkChanged = createEvent(this, "checkChanged", 7);
    /** If 'true' the toggle is checked (on). */
    this.checked = false;
    /** If 'true' the toggle is not be interacted with. */
    this.disabled = false;
  }
  checkedChanged(isChecked) {
    this.checkChanged.emit({ checked: isChecked });
  }
  render() {
    return (h(Host, null, h("button", { disabled: this.disabled, class: { 'checked': this.checked }, onClick: () => {
        if (!this.disabled) {
          this.checked = !this.checked;
        }
      } }, h("div", { class: "handle" }))));
  }
  get element() { return getElement(this); }
  static get watchers() { return {
    "checked": ["checkedChanged"]
  }; }
};
DnnToggle.style = dnnToggleCss;

export { DnnToggle as dnn_toggle };

//# sourceMappingURL=dnn-toggle.entry.js.map