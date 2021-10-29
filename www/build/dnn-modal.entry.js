import { r as registerInstance, e as createEvent, h, f as Host, g as getElement } from './index-28b3c571.js';

const dnnModalCss = ":host{display:block}:host .overlay{background-color:rgba(0, 0, 0, 0.5);position:fixed;top:0;left:0;width:100%;height:100%;z-index:1;display:flex;justify-content:center;align-items:center;backdrop-filter:blur(2px);transition:all 300ms ease-in-out;visibility:hidden;opacity:0}:host .overlay .modal{background-color:white;padding:30px;transform:scale(2);transition:all 300ms ease-in-out;z-index:2;position:relative;margin:10%;max-height:80%;border-radius:var(--dnn-controls-radius, 5px);box-shadow:10px 10px 20px 0 rgba(0, 0, 0, 0.5);display:block}:host .overlay .modal .close{position:absolute;background-color:white;border:2px solid white;border-radius:50%;padding:0;margin:0;top:-12px;right:-12px;outline:none;display:flex;justify-content:center;align-items:center}:host .overlay .modal .close:focus,:host .overlay .modal .close:hover{box-shadow:0 0 2px 2px var(--dnn-color-primary, blue)}:host .overlay .modal .close svg{width:24px;height:24px;color:grey}:host .overlay.visible{visibility:visible;opacity:1}:host .overlay.visible .modal{transform:scale(1);box-shadow:4px 4px 10px 0px rgba(0, 0, 0, 0.5);display:block}";

let DnnModal = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.dismissed = createEvent(this, "dismissed", 7);
    /**
     * Pass false to remove the backdrop click auto-dismiss feature.
     */
    this.backdropDismiss = true;
    /**
     * Optionally pass the aria-label text for the close button.
     * Defaults to "Close modal" if not provided.
     */
    this.closeText = "Close modal";
    /**
     * Optionally you can pass false to not show the close button.
     * If you decide to do so, you should either not also prevent dismissal by clicking the backdrop
     * or provide your own dismissal logic in the modal content.
     */
    this.showCloseButton = true;
    this.visible = false;
  }
  /**
   * Shows the modal
   */
  async show() {
    this.visible = true;
  }
  /**
   * Hides the modal
   */
  async hide() {
    this.visible = false;
  }
  handleDismiss() {
    this.visible = false;
    this.dismissed.emit();
  }
  handleBackdropClick(e) {
    const element = e.target;
    if (element.id === "backdrop" && this.backdropDismiss) {
      this.handleDismiss();
    }
  }
  render() {
    return (h(Host, null, h("div", { id: "backdrop", class: this.visible ? 'overlay visible' : 'overlay', onClick: e => this.handleBackdropClick(e) }, h("div", { class: "modal" }, this.showCloseButton &&
      h("button", { class: "close", "aria-label": this.closeText, onClick: () => this.handleDismiss() }, h("svg", { "aria-hidden": "true", focusable: "false", "data-prefix": "fas", "data-icon": "times-circle", class: "svg-inline--fa fa-times-circle fa-w-16", role: "img", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, h("path", { fill: "currentColor", d: "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z" }))), h("slot", null)))));
  }
  get el() { return getElement(this); }
};
DnnModal.style = dnnModalCss;

export { DnnModal as dnn_modal };
