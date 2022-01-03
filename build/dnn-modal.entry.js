import { r as registerInstance, e as createEvent, h, f as Host, g as getElement } from './index-2143f95b.js';
import { c as cancelIcon } from './cancel-dd05f5dc.js';

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
      h("button", { class: "close", innerHTML: cancelIcon, "aria-label": this.closeText, onClick: () => this.handleDismiss() }), h("slot", null)))));
  }
  get el() { return getElement(this); }
};
DnnModal.style = dnnModalCss;

export { DnnModal as dnn_modal };

//# sourceMappingURL=dnn-modal.entry.js.map