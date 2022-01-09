import { r as registerInstance, e as createEvent, h, f as Host, g as getElement } from './index-2143f95b.js';

const dnnButtonCss = ":host{--background-color:transparent;--color:#333;--border-size:1px;--border-color:var(--backround-color);--border-radius:var(--dnn-controls-radius, 5px);--padding:var(--dnn-controls-padding, 5px);display:inline-block;width:auto}:host(.disabled){pointer-events:none}:host(.primary){--background-color:var(--dnn-color-primary, blue);--color:var(--dnn-color-primary-contrast, white);--focus-color:var(--background-color)}:host(.primary.reversed){--background-color:var(--dnn-color-primary-contrast, white);--color:var(--dnn-color-primary, blue);--border-color:var(--dnn-color-primary, blue);--focus-color:var(--color)}:host(.secondary){--background-color:var(--dnn-color-secondary, green);--color:var(--dnn-color-secondary-contrast, white);--focus-color:var(--background-color)}:host(.secondary.reversed){--background-color:var(--dnn-color-secondary-contrast, white);--color:var(--dnn-color-secondary, blue);--border-color:var(--dnn-color-secondary, blue);--focus-color:var(--color)}:host(.tertiary){--background-color:var(--dnn-color-tertiary, yellow);--color:var(--dnn-color-tertiary-contrast, black);--focus-color:var(--background-color)}:host(.tertiary.reversed){--background-color:var(--dnn-color-tertiary-contrast, white);--color:var(--dnn-color-tertiary, blue);--border-color:var(--dnn-color-tertiary, blue);--focus-color:var(--color)}:host(.hydrated) button{border:var(--border-size) solid var(--border-color);border-radius:var(--border-radius);padding:var(--padding) calc(var(--padding) * 2);background-color:transparent;background-color:var(--background-color);color:var(--color);outline:none}:host(.hydrated) button:focus,:host(.hydrated) button:hover{box-shadow:0 0 2px 2px var(--focus-color)}:host(:disabled,[disabled]) button{pointer-events:none;opacity:0.5}:host(.small) button{padding:calc(var(--padding) / 2) var(--padding);font-size:0.7em}:host(.large) button{padding:calc(var(--padding) * 1.5) calc(var(--padding) * 3);font-size:1.2em}button{height:100%;width:100%;cursor:pointer}";

let DnnButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.confirmed = createEvent(this, "confirmed", 3);
    this.canceled = createEvent(this, "canceled", 3);
    /**
     * Optional button style,
     * can be either primary, secondary or tertiary and defaults to primary if not specified
     */
    this.type = 'primary';
    /**
     * Optionally reverses the button style.
     */
    this.reversed = false;
    /**
     * Optionally sets the button size, small normal or large, defaults to normal
     */
    this.size = 'normal';
    /**
     * Optionally add a confirmation dialog before firing the action.
     */
    this.confirm = false;
    /**
     * The text of the yes button for confirmation.
     */
    this.confirmYesText = "Yes";
    /**
     * The text of the no button for confirmation.
     */
    this.confirmNoText = "No";
    /**
     * The text of the confirmation message;
     */
    this.confirmMessage = "Are you sure ?";
    /**
     * Disables the button
     */
    this.disabled = false;
    this.modalVisible = false;
  }
  componentDidLoad() {
    this.el.classList.add(this.type);
    if (this.reversed) {
      this.el.classList.add('reversed');
    }
    if (this.size !== 'normal') {
      this.el.classList.add(this.size);
    }
    this.modal = this.el.shadowRoot.querySelector('dnn-modal');
  }
  handleConfirm() {
    this.modal.hide();
    this.modalVisible = false;
    this.confirmed.emit();
  }
  handleCancel() {
    this.modal.hide();
    this.modalVisible = false;
    this.canceled.emit();
  }
  handleClick() {
    if (this.confirm && !this.modalVisible) {
      this.modal.show();
      this.modalVisible = true;
    }
  }
  render() {
    return (h(Host, { disabled: this.disabled, style: { 'pointer-events': this.disabled ? 'none' : 'all' } }, h("button", { class: "button", onClick: () => this.handleClick(), disabled: this.disabled }, h("slot", null)), this.confirm &&
      h("dnn-modal", { showCloseButton: false, backdropDismiss: false }, h("p", null, this.confirmMessage), h("div", { style: {
          display: 'flex',
          justifyContent: 'flex-end'
        } }, h("dnn-button", { type: 'primary', style: { margin: '5px' }, onClick: () => this.handleConfirm() }, this.confirmYesText), h("dnn-button", { type: 'secondary', style: { margin: '5px' }, onClick: () => this.handleCancel() }, this.confirmNoText)))));
  }
  get el() { return getElement(this); }
};
DnnButton.style = dnnButtonCss;

export { DnnButton as dnn_button };

//# sourceMappingURL=dnn-button.entry.js.map