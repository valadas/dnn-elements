import { r as registerInstance, e as createEvent, h, f as Host, g as getElement } from './index-b89da9ee.js';
import { g as getMovementFromEvent } from './mouseUtilities-817973b4.js';

const dnnVerticalSplitviewCss = ":host{display:flex;align-items:stretch;margin:0 auto;position:relative;--left-pane-background-color:transparent;--right-pane-background-color:transparent}button{border:none;margin:0;padding:0;cursor:ew-resize;position:absolute;height:100%;background-color:transparent}button.transition{transition:all 300ms ease-in-out}.pane{overflow-y:auto}.pane.transition{transition:all 300ms ease-in-out}.pane.left{background-color:var(--left-pane-background-color)}.pane.right{background-color:var(--right-pane-background-color);flex-grow:1}";

const DnnVerticalSplitview = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.widthChanged = createEvent(this, "widthChanged", 7);
    /** The width of the splitter area. */
    this.splitterWidth = 16;
    /** The percentage position of the splitter in the container. */
    this.splitWidthPercentage = 30;
    this.leftWidth = 0;
    this.rightWidth = 0;
  }
  /** Sets the width percentage of the divider */
  async setSplitWidthPercentage(newWidth) {
    const panes = this.element.shadowRoot.querySelectorAll(".pane");
    requestAnimationFrame(() => {
      panes.forEach(pane => pane.classList.add("transition"));
      this.splitter.classList.add("transition");
      requestAnimationFrame(() => {
        const fullWidth = this.element.getBoundingClientRect().width;
        let newLeft = fullWidth * newWidth / 100;
        if (newLeft < 0) {
          newLeft = 0;
        }
        if (newLeft > fullWidth) {
          newLeft = fullWidth;
        }
        this.leftWidth = newLeft;
        this.rightWidth = fullWidth - newLeft;
        setTimeout(() => {
          panes.forEach(pane => pane.classList.remove("transition"));
          this.splitter.classList.remove("transition");
        }, 300);
      });
    });
  }
  /** Gets the current divider position percentage. */
  async getSplitWidthPercentage() {
    const fullWidth = this.element.getBoundingClientRect().width;
    return this.leftWidth / fullWidth;
  }
  componentDidLoad() {
    requestAnimationFrame(() => {
      this.resizeObserver = new ResizeObserver(() => {
        const fullWidth = this.element.getBoundingClientRect().width;
        this.leftWidth = fullWidth * this.splitWidthPercentage / 100;
        this.rightWidth = fullWidth - this.leftWidth;
        this.widthChanged.emit(this.splitWidthPercentage);
      });
      this.resizeObserver.observe(this.element);
    });
  }
  handleMouseDown(event) {
    event.preventDefault();
    const handleDrag = (ev) => {
      requestAnimationFrame(() => {
        let fullWidth = this.element.getBoundingClientRect().width;
        let { movementX } = getMovementFromEvent(ev, this.previousTouch);
        let newLeft = this.leftWidth + movementX;
        if (newLeft < 0) {
          newLeft = 0;
        }
        if (newLeft > fullWidth) {
          newLeft = fullWidth;
        }
        this.leftWidth = newLeft;
        this.rightWidth = fullWidth - newLeft;
        this.splitWidthPercentage = this.leftWidth / fullWidth * 100;
      });
    };
    const handleDragFinished = () => {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("touchmove", handleDrag);
      const fullWidth = this.element.getBoundingClientRect().width;
      const newPercentage = this.leftWidth / fullWidth * 100;
      this.widthChanged.emit(newPercentage);
    };
    document.addEventListener("mouseup", handleDragFinished);
    document.addEventListener("touchend", handleDragFinished);
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("touchmove", handleDrag);
  }
  handleKeyDown(e) {
    let movementX = 0;
    switch (e.key) {
      case "ArrowLeft":
        movementX = -10;
        break;
      case "ArrowRight":
        movementX = 10;
        break;
      default:
        return;
    }
    if (e.shiftKey) {
      movementX = movementX * 10;
    }
    const fullWidth = this.element.getBoundingClientRect().width;
    let newLeft = this.leftWidth + movementX;
    if (newLeft < 0) {
      newLeft = 0;
    }
    if (newLeft > fullWidth) {
      newLeft = fullWidth;
    }
    this.leftWidth = newLeft;
    this.rightWidth = fullWidth - this.leftWidth;
  }
  render() {
    return (h(Host, null, h("div", { class: "left pane", style: {
        width: `${this.leftWidth}px`,
      } }, h("slot", { name: "left" })), h("button", { onMouseDown: e => this.handleMouseDown(e), onTouchStart: e => this.handleMouseDown(e), onKeyDown: e => this.handleKeyDown(e), ref: el => this.splitter = el, style: {
        minWidth: `${this.splitterWidth.toString()}px`,
        left: `${this.leftWidth - 2}px`,
      } }, h("slot", null)), h("div", { class: "right pane", style: {
        width: `${this.rightWidth}px`,
      } }, h("slot", { name: "right" }))));
  }
  get element() { return getElement(this); }
};
DnnVerticalSplitview.style = dnnVerticalSplitviewCss;

export { DnnVerticalSplitview as dnn_vertical_splitview };

//# sourceMappingURL=dnn-vertical-splitview.entry.js.map