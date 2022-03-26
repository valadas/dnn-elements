'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-514ef6dd.js');
const debounce = require('./debounce-1de79bc7.js');

const dnnButtonCss = ":host{--background-color:transparent;--color:#333;--border-size:1px;--border-color:var(--backround-color);--border-radius:var(--dnn-controls-radius, 5px);--padding:var(--dnn-controls-padding, 5px);display:inline-block;width:auto}:host(.disabled){pointer-events:none}:host(.primary){--background-color:var(--dnn-color-primary, blue);--color:var(--dnn-color-primary-contrast, white);--focus-color:var(--background-color)}:host(.primary.reversed){--background-color:var(--dnn-color-primary-contrast, white);--color:var(--dnn-color-primary, blue);--border-color:var(--dnn-color-primary, blue);--focus-color:var(--color)}:host(.secondary){--background-color:var(--dnn-color-secondary, green);--color:var(--dnn-color-secondary-contrast, white);--focus-color:var(--background-color)}:host(.secondary.reversed){--background-color:var(--dnn-color-secondary-contrast, white);--color:var(--dnn-color-secondary, blue);--border-color:var(--dnn-color-secondary, blue);--focus-color:var(--color)}:host(.tertiary){--background-color:var(--dnn-color-tertiary, yellow);--color:var(--dnn-color-tertiary-contrast, black);--focus-color:var(--background-color)}:host(.tertiary.reversed){--background-color:var(--dnn-color-tertiary-contrast, white);--color:var(--dnn-color-tertiary, blue);--border-color:var(--dnn-color-tertiary, blue);--focus-color:var(--color)}:host(.hydrated) button{border:var(--border-size) solid var(--border-color);border-radius:var(--border-radius);padding:var(--padding) calc(var(--padding) * 2);background-color:transparent;background-color:var(--background-color);color:var(--color);outline:none}:host(.hydrated) button:focus,:host(.hydrated) button:hover{-webkit-box-shadow:0 0 2px 2px var(--focus-color);box-shadow:0 0 2px 2px var(--focus-color)}:host(:disabled,[disabled]) button{pointer-events:none;opacity:0.5}:host(.small) button{padding:calc(var(--padding) / 2) var(--padding);font-size:0.7em}:host(.large) button{padding:calc(var(--padding) * 1.5) calc(var(--padding) * 3);font-size:1.2em}button{height:100%;width:100%;cursor:pointer}";

const DnnButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.confirmed = index.createEvent(this, "confirmed", 7);
    this.canceled = index.createEvent(this, "canceled", 7);
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
  getElementClasses() {
    const classes = [];
    classes.push(this.type);
    if (this.reversed) {
      classes.push('reversed');
    }
    if (this.size !== 'normal') {
      classes.push(this.size);
    }
    return classes.join(' ');
  }
  render() {
    return (index.h(index.Host, { class: this.getElementClasses(), disabled: this.disabled, style: { 'pointer-events': this.disabled ? 'none' : 'all' } }, index.h("button", { class: "button", onClick: () => this.handleClick(), disabled: this.disabled }, index.h("slot", null)), this.confirm &&
      index.h("dnn-modal", { showCloseButton: false, backdropDismiss: false }, index.h("p", null, this.confirmMessage), index.h("div", { style: {
          display: 'flex',
          justifyContent: 'flex-end'
        } }, index.h("dnn-button", { type: 'primary', style: { margin: '5px' }, onClick: () => this.handleConfirm() }, this.confirmYesText), index.h("dnn-button", { type: 'secondary', style: { margin: '5px' }, onClick: () => this.handleCancel() }, this.confirmNoText)))));
  }
  get el() { return index.getElement(this); }
};
DnnButton.style = dnnButtonCss;

const dnnCheckboxCss = ":host{--focus-color:var(--dnn-color-primary, #3792ED);display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;gap:0.25rem;margin:3px}button{background-color:transparent;border:0;padding:0;margin:0;outline:none;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}button .unchecked,button .checked,button .intermediate{display:none}button.checked .checked,button.unchecked .unchecked,button.intermediate .intermediate{display:block}button svg.undefined{opacity:0.45}button:focus{-webkit-box-shadow:0 0 2px 2px var(--focus-color);box-shadow:0 0 2px 2px var(--focus-color)}";

const DnnCheckbox = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.checkedchange = index.createEvent(this, "checkedchange", 7);
    /** Defines if the checkbox is checked (true) or unchecked (false) or in an intermediate state (undefined) */
    this.checked = "unchecked";
    /** Defines if clicking the checkbox will go through the intermediate state between checked and unchecked (tri-state) */
    this.useIntermediate = false;
  }
  changeState() {
    if (!this.useIntermediate) {
      switch (this.checked) {
        case "checked":
          this.checked = "unchecked";
          break;
        case "unchecked":
        case "intermediate":
          this.checked = "checked";
          break;
      }
      this.checkedchange.emit(this.checked);
      return;
    }
    switch (this.checked) {
      case "checked":
        this.checked = "intermediate";
        break;
      case "intermediate":
        this.checked = "unchecked";
        break;
      case "unchecked":
        this.checked = "checked";
        break;
    }
    this.checkedchange.emit(this.checked);
  }
  render() {
    return (index.h(index.Host, null, index.h("button", { class: `icon ${this.checked}`, onClick: () => this.changeState() }, index.h("div", { class: "unchecked" }, index.h("slot", { name: "uncheckedicon" }, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, index.h("path", { d: "M0 0h24v24H0z", fill: "none" }), index.h("path", { d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" })))), index.h("div", { class: "checked" }, index.h("slot", { name: "checkedicon" }, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, index.h("path", { d: "M0 0h24v24H0z", fill: "none" }), index.h("path", { d: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" })))), index.h("div", { class: "intermediate" }, index.h("slot", { name: "intermediateicon" }, index.h("svg", { class: "undefined", xmlns: "http://www.w3.org/2000/svg", "enable-background": "new 0 0 24 24", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, index.h("g", null, index.h("rect", { fill: "none", height: "24", width: "24" })), index.h("g", null, index.h("g", null, index.h("g", null, index.h("path", { d: "M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M17,13H7v-2h10V13z" })))))))), index.h("label", { htmlFor: this.el.id, onClick: () => this.changeState() }, index.h("slot", null))));
  }
  get el() { return index.getElement(this); }
};
DnnCheckbox.style = dnnCheckboxCss;

const dnnChevronCss = ":host{display:inline-block}button{border:none;padding:0px;margin:0px;min-width:15px;min-height:15px;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;background-color:transparent;outline:none}svg{height:2em;width:2em;-webkit-transition:all 300ms ease-in-out;transition:all 300ms ease-in-out}button:focus svg,button:hover svg{color:var(--dnn-color-primary)}:host([expanded]) svg{-webkit-transform:rotate(90deg);transform:rotate(90deg)}";

const DnnChevron = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.changed = index.createEvent(this, "changed", 7);
    /** Expand text for screen readers */
    this.expandText = "expand";
    /** Collapse text for screen readers */
    this.collapseText = "collapse";
    /** Is the chevron expanded */
    this.expanded = false;
  }
  handleExpandedChanged(newValue) {
    this.changed.emit(newValue);
  }
  render() {
    return (index.h(index.Host, null, index.h("button", { "aria-label": this.expanded ? this.collapseText : this.expandText, onClick: () => this.expanded = !this.expanded }, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, index.h("path", { d: "M0 0h24v24H0z", fill: "none" }), index.h("path", { d: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" })))));
  }
  static get watchers() { return {
    "expanded": ["handleExpandedChanged"]
  }; }
};
DnnChevron.style = dnnChevronCss;

const dnnCollapsibleCss = ":host{display:block}#container{max-height:0;overflow:hidden;-webkit-transition:max-height 300ms ease-in-out;transition:max-height 300ms ease-in-out}";

const DnnCollapsible = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.dnnCollapsibleHeightChanged = index.createEvent(this, "dnnCollapsibleHeightChanged", 7);
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
    return (index.h(index.Host, null, index.h("div", { id: "container", class: this.expanded && "expanded", ref: el => this.container = el, style: { transition: `max-height ${this.transitionDuration}ms ease-in-out` } }, index.h("slot", null))));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "expanded": ["handledExpandedChanged"]
  }; }
};
DnnCollapsible.style = dnnCollapsibleCss;

/** Color utility class with hsl and rgb converters
 * based on math at https://en.wikipedia.org/wiki/HSL_and_HSV
 * @copyright Copyright (c) .NET Foundation. All rights reserved.
 * @license MIT
 */
class ColorInfo {
  constructor() {
    this._hue = 0;
    this._saturation = 0;
    this._lightness = 0;
  }
  /** gets the color hue
   * @returns a number between 0 and 359, could contain decimals
   */
  get hue() { return this._hue; }
  set hue(value) {
    if (value < 0) {
      value = 0;
    }
    if (value > 359) {
      value = 359;
    }
    this._hue = value;
  }
  /** gets the color saturation
   * @returns a number between 0 and 1, could contain decimals
  */
  get saturation() { return this._saturation; }
  set saturation(value) {
    if (value < 0) {
      value = 0;
    }
    if (value > 1) {
      value = 1;
    }
    this._saturation = value;
  }
  /** gets the color lightness
   * @returns a number between 0 and 1, could contain decimals
   */
  get lightness() { return this._lightness; }
  set lightness(value) {
    if (value < 0) {
      value = 0;
    }
    if (value > 1) {
      value = 1;
    }
    this._lightness = value;
  }
  /** gets or sets the red component
   * @returns an integer between 0 and 255
  */
  get red() {
    return this.getRGB().red;
  }
  set red(value) {
    this.setHSL(value, this.green, this.blue);
  }
  /** gets or sets the green component
   * @returns an integer between 0 and 255
   */
  get green() {
    return this.getRGB().green;
  }
  set green(value) {
    this.setHSL(this.red, value, this.blue);
  }
  /** gets or sets the blue component
   * @returns an integer between 0 and 255
   */
  get blue() {
    return this.getRGB().blue;
  }
  set blue(value) {
    this.setHSL(this.red, this.green, value);
  }
  /** gets or sets the hex color value, expresses as 6 hexadecimal characters.
   * @returns hex representation of the color
   */
  get hex() {
    var r = this.getHex(this.red);
    var g = this.getHex(this.green);
    var b = this.getHex(this.blue);
    return r + g + b;
  }
  set hex(value) {
    this.red = parseInt(value.substr(0, 2));
    this.green = parseInt(value.substr(2, 2));
    this.blue = parseInt(value.substr(4, 2));
  }
  /** gets white or black color that is a good oposite to the current color
   * @returns - "000000" or "FFFFFF"
   */
  get contrastColor() {
    const brightness = (this.red * 299 + this.green * 587 + this.blue * 114) / 1000;
    if (brightness > 127) {
      return "000000";
    }
    return "FFFFFF";
  }
  getRGB() {
    const chroma = (1 - Math.abs((2 * this._lightness) - 1)) * this.saturation;
    // find the quandrant of the hue
    const quadrant = this._hue / 60;
    // calculate the offset from the quandrant center
    const offset = chroma * (1 - Math.abs(quadrant % 2 - 1));
    // Apply the chroma to the primary component and the offset to the 2nd most important component
    let r = 0, g = 0, b = 0;
    if (0 <= quadrant && quadrant <= 1) {
      r = chroma;
      g = offset; // red to yellow
    }
    else if (1 <= quadrant && quadrant <= 2) {
      g = chroma;
      r = offset; // yellow to green
    }
    else if (2 <= quadrant && quadrant <= 3) {
      g = chroma;
      b = offset; // green to cyan
    }
    else if (3 <= quadrant && quadrant <= 4) {
      b = chroma;
      g = offset; // cyan to blue
    }
    else if (4 <= quadrant && quadrant <= 5) {
      b = chroma;
      r = offset; // blue to magenta
    }
    else if (5 <= quadrant && quadrant <= 6) {
      r = chroma;
      b = offset; // magenta to red
    }
    // calculate the bias to add to all channels to match the lightness
    const bias = this._lightness - (chroma / 2);
    return {
      red: Math.round((r + bias) * 255),
      green: Math.round((g + bias) * 255),
      blue: Math.round((b + bias) * 255)
    };
  }
  setHSL(red, green, blue) {
    // GENERAL DATA
    // all math is based on values from 0 to 1
    const r = red / 255, g = green / 255, b = blue / 255;
    // we need to max, min and the difference between them to derive hsl
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const diff = max - min;
    let h = 0, s = 0, l = 0;
    // HUE
    if (diff === 0) { // neutral
      h = 0;
    }
    else if (max === r) { // red (magenta to yellow range)
      h = 60 * ((g - b) / diff);
    }
    else if (max === g) { // green (yellow to cyan range)
      h = 60 * (2 + ((b - r) / diff));
    }
    else if (max === b) { // blue (cyan to magenta range)
      h = 60 * (4 + ((r - g) / diff));
    }
    if (h < 0) {
      h = h + 360;
    } // ensures positive hues only
    if (h > 359) {
      h = 359;
    } // ensures we never return 360 for simplicity since it is the same as 0
    // LIGHTNESS
    l = (max + min) / 2;
    // SATURATION
    if (max === 0 || min === 1) { // pure black or white have no saturation
      s = 0;
    }
    else {
      s = (max - l) / (Math.min(l, 1 - l));
    }
    this._hue = h;
    this._saturation = s;
    this._lightness = l;
  }
  getHex(value) {
    var hex = value.toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }
    return hex;
  }
}

const dnnColorPickerCss = ".dnn-color-picker{padding:15px;max-width:400px}.dnn-color-picker .dnn-color-sliders{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;min-width:200px}.dnn-color-picker .dnn-color-sliders .dnn-color-s-b{border:1px solid #ccc;padding-bottom:var(--color-box-height, 50%);position:relative;background-color:red}.dnn-color-picker .dnn-color-sliders .dnn-color-s-b:before{content:\"\";position:absolute;top:0;left:0;width:100%;height:100%;z-index:1;background:-webkit-gradient(linear, left top, right top, from(white), to(red));background:linear-gradient(to right, white, red);mix-blend-mode:saturation}.dnn-color-picker .dnn-color-sliders .dnn-color-s-b:after{content:\"\";position:absolute;top:0;left:0;width:100%;height:100%;z-index:2;background:-webkit-gradient(linear, left top, left bottom, from(white), to(black));background:linear-gradient(to bottom, white, black);mix-blend-mode:luminosity}.dnn-color-picker .dnn-color-sliders .dnn-color-s-b button{position:absolute;bottom:calc(50% - 4px);left:calc(50% - 4px);width:8px;height:8px;z-index:3;display:block;background:none;border:none;margin-left:-4px;margin-bottom:-4px;padding:7px;background-color:#fff;border-radius:50%}.dnn-color-picker .dnn-color-sliders .dnn-color-s-b button:before{content:\"\";position:absolute;top:-1px;left:-1px;border-radius:50%}.dnn-color-picker .dnn-color-sliders .dnn-color-s-b button:after{content:\"\";position:absolute;top:0px;left:0px;border-radius:50%;width:10px;height:10px;border:2px solid #ccc}.dnn-color-picker .dnn-color-sliders .dnn-color-bar{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;margin-top:15px}.dnn-color-picker .dnn-color-sliders .dnn-color-bar .dnn-color-result{-ms-flex-direction:column;flex-direction:column;width:50px;height:50px;border-radius:50%;background:red}.dnn-color-picker .dnn-color-sliders .dnn-color-bar .dnn-color-hue{-ms-flex:auto;flex:auto;margin-left:10px;height:16px;border:1px solid #ccc;position:relative;background:-webkit-gradient(linear, left top, right top, color-stop(0, #f00), color-stop(17%, #ff0), color-stop(33%, #0f0), color-stop(50%, #0ff), color-stop(67%, #00f), color-stop(84%, #f0f), to(#f00));background:linear-gradient(to right, #f00 0, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 84%, #f00 100%)}.dnn-color-picker .dnn-color-sliders .dnn-color-bar .dnn-color-hue button{width:10px;height:20px;position:absolute;top:-2px;left:calc(50% - 4px);border:0;padding:0;background-color:transparent;padding-left:-8px}.dnn-color-picker .dnn-color-sliders .dnn-color-bar .dnn-color-hue button:before{content:\"\";position:absolute;top:-2px;left:0px;border-radius:3px;width:100%;height:100%;border:1px solid #ccc;background-color:#fff}.dnn-color-picker .dnn-color-fields{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:justify;justify-content:space-between}.dnn-color-picker .dnn-color-fields .dnn-color-mode-switch{display:-ms-flexbox;display:flex;-ms-flex-align:end;align-items:flex-end;padding:0.5em}.dnn-color-picker .dnn-color-fields .dnn-color-mode-switch button{background-color:transparent;border:none}.dnn-color-picker .dnn-color-fields .dnn-color-mode-switch button svg{width:3em;height:3em;pointer-events:none;outline:none}.dnn-color-picker .dnn-color-fields .dnn-rgb-color-fields{display:-ms-flexbox;display:flex;-ms-flex-pack:space-evenly;justify-content:space-evenly}.dnn-color-picker .dnn-color-fields .dnn-rgb-color-fields .dnn-rgb-color-field{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex:auto;flex:auto;text-align:center;padding:0.5em}.dnn-color-picker .dnn-color-fields .dnn-rgb-color-fields .dnn-rgb-color-field label{padding-bottom:0.25em}.dnn-color-picker .dnn-color-fields .dnn-rgb-color-fields .dnn-rgb-color-field input{border-radius:var(--dnn-button-radius, 3px);border:1px solid #ccc;padding:0.5em;padding-left:1.3em;text-align:center}.dnn-color-picker .dnn-color-fields .dnn-rgb-color-fields .dnn-rgb-color-field input.red{border-color:red}.dnn-color-picker .dnn-color-fields .dnn-rgb-color-fields .dnn-rgb-color-field input.green{border-color:green}.dnn-color-picker .dnn-color-fields .dnn-rgb-color-fields .dnn-rgb-color-field input.blue{border-color:blue}.dnn-color-picker .dnn-color-fields .dnn-hsl-color-fields{display:-ms-flexbox;display:flex;-ms-flex-pack:space-evenly;justify-content:space-evenly}.dnn-color-picker .dnn-color-fields .dnn-hsl-color-fields .dnn-hsl-color-field{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex:auto;flex:auto;text-align:center;padding:0.5em}.dnn-color-picker .dnn-color-fields .dnn-hsl-color-fields .dnn-hsl-color-field label{padding-bottom:0.25em}.dnn-color-picker .dnn-color-fields .dnn-hsl-color-fields .dnn-hsl-color-field input{border-radius:var(--dnn-button-radius, 3px);border:1px solid #ccc;padding:0.5em;padding-left:1.3em;text-align:center}.dnn-color-picker .dnn-color-fields .dnn-hex-color-fields{display:-ms-flexbox;display:flex;-ms-flex-pack:space-evenly;justify-content:space-evenly}.dnn-color-picker .dnn-color-fields .dnn-hex-color-fields .dnn-hex-color-field{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex:auto;flex:auto;text-align:center;padding:0.5em}.dnn-color-picker .dnn-color-fields .dnn-hex-color-fields .dnn-hex-color-field label{padding-bottom:0.25em}.dnn-color-picker .dnn-color-fields .dnn-hex-color-fields .dnn-hex-color-field .hex-input{position:relative;border-radius:var(--dnn-button-radius, 3px);border:1px solid #ccc;padding:0.323em;text-align:center}.dnn-color-picker .dnn-color-fields .dnn-hex-color-fields .dnn-hex-color-field .hex-input input{border:0;padding:0;margin:0;width:100%;height:100%;text-align:center}.dnn-color-picker .dnn-color-fields .dnn-hex-color-fields .dnn-hex-color-field .hex-input button{position:absolute;height:100%;top:0;right:1em;background-color:transparent;border:0;padding:0;margin:0}.dnn-color-picker .dnn-color-fields .dnn-hex-color-fields .dnn-hex-color-field .hex-input button svg{min-width:1em}";

/** Reusable DNN UI component to pick a color
 * @copyright Copyright (c) .NET Foundation. All rights reserved.
 * @license MIT
 */
var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const DnnColorPicker = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.colorChanged = index.createEvent(this, "colorChanged", 7);
    /** Sets the initial color, must be a valid 8 character hexadecimal string without the # sign. */
    this.color = "FFFFFF";
    /** Sets the width-height ratio of the color picker saturation-lightness box.
     * @example 100% renders a perfect square
     */
    this.colorBoxHeight = "50%";
    this.rgbDisplay = "flex";
    this.hslDisplay = "none";
    this.hexDisplay = "none";
    this.handleSaturationLightnessMouseDown = (e) => {
      e.preventDefault();
      this.handleDragLightnessSaturation(e);
      window.addEventListener('mousemove', this.handleDragLightnessSaturation);
      window.addEventListener('mouseup', this.handleSaturationLightnessMouseUp);
    };
    this.handleDragLightnessSaturation = (e) => {
      const rect = this.saturationLightnessBox.getBoundingClientRect();
      let x = e.clientX - rect.left;
      if (x < 0) {
        x = 0;
      }
      if (x > rect.width) {
        x = rect.width;
      }
      x = x / rect.width;
      let y = e.clientY - rect.top;
      if (y < 0) {
        y = 0;
      }
      if (y > rect.height) {
        y = rect.height;
      }
      y = 1 - (y / rect.height);
      const newColor = new ColorInfo();
      newColor.hue = this.currentColor.hue;
      newColor.saturation = x;
      newColor.lightness = y;
      this.currentColor = newColor;
    };
    this.handleSaturationLightnessMouseUp = () => {
      window.removeEventListener('mousemove', this.handleDragLightnessSaturation);
      window.removeEventListener('mouseup', this.handleSaturationLightnessMouseUp);
    };
    this.handleHueMouseDown = (e) => {
      e.preventDefault();
      this.handleDragHue(e);
      window.addEventListener('mousemove', this.handleDragHue);
      window.addEventListener('mouseup', this.handleHueMouseUp);
    };
    this.handleHueMouseUp = () => {
      window.removeEventListener('mousemove', this.handleDragHue);
      window.removeEventListener('mouseup', this.handleHueMouseUp);
    };
    this.handleDragHue = (e) => {
      const rect = this.hueRange.getBoundingClientRect();
      let x = e.clientX - rect.left;
      if (x < 0) {
        x = 0;
      }
      if (x > rect.width) {
        x = rect.width;
      }
      x = x / rect.width * 360;
      const newColor = new ColorInfo();
      newColor.hue = x;
      newColor.saturation = this.currentColor.saturation;
      newColor.lightness = this.currentColor.lightness;
      this.currentColor = newColor;
    };
    this.handleComponentValueChange = (e, channel) => {
      let value = parseInt(e.target.value);
      if (isNaN(value)) {
        return;
      }
      const newColor = new ColorInfo();
      if (value < 0) {
        value = 0;
      }
      if (value > 255) {
        value = 255;
      }
      let r = this.currentColor.red;
      let g = this.currentColor.green;
      let b = this.currentColor.blue;
      switch (channel) {
        case 'red':
          r = value;
          break;
        case 'green':
          g = value;
          break;
        case 'blue':
          b = value;
          break;
      }
      newColor.green = g;
      newColor.red = r;
      newColor.blue = b;
      this.currentColor = newColor;
    };
    this.handleHSLChange = (e, component) => {
      let value = parseInt(e.target.value);
      if (isNaN(value)) {
        return;
      }
      const newColor = new ColorInfo();
      if (value != null) {
        let h = this.currentColor.hue;
        let s = this.currentColor.saturation;
        let l = this.currentColor.lightness;
        switch (component) {
          case "hue":
            if (value < 0) {
              value = 0;
            }
            if (value > 359) {
              value = 0;
            }
            h = value;
            break;
          case "saturation":
            if (value < 0) {
              value = 0;
            }
            if (value > 100) {
              value = 100;
            }
            s = value / 100;
            break;
          case "lightness":
            if (value < 0) {
              value = 0;
            }
            if (value > 100) {
              value = 100;
            }
            l = value / 100;
            break;
        }
        newColor.hue = h;
        newColor.saturation = s;
        newColor.lightness = l;
        this.currentColor = newColor;
      }
    };
    this.handleSaturationLightnessKeyDown = (e) => {
      let newColor = new ColorInfo();
      newColor.hue = this.currentColor.hue;
      newColor.saturation = this.currentColor.saturation;
      newColor.lightness = this.currentColor.lightness;
      let value = 0.01;
      if (e.shiftKey) {
        value = 0.1;
      }
      switch (e.key) {
        case "ArrowUp":
          newColor.lightness += value;
          break;
        case "ArrowDown":
          newColor.lightness -= value;
          break;
        case "ArrowLeft":
          newColor.saturation -= value;
          break;
        case "ArrowRight":
          newColor.saturation += value;
      }
      this.currentColor = newColor;
    };
    this.handleHueKeyDown = (e) => {
      let newColor = new ColorInfo();
      newColor.hue = this.currentColor.hue;
      newColor.saturation = this.currentColor.saturation;
      newColor.lightness = this.currentColor.lightness;
      let value = 1;
      if (e.shiftKey) {
        value = 10;
      }
      switch (e.key) {
        case "ArrowLeft":
          newColor.hue -= value;
          break;
        case "ArrowRight":
          newColor.hue += value;
      }
      this.currentColor = newColor;
    };
  }
  colorChangedHandler(color) {
    this.colorChanged.emit(color);
  }
  handeCurrentColorChanged(newValue) {
    this.colorChangedHandler(newValue);
  }
  componentWillLoad() {
    this.handleHexChange(this.color);
  }
  componentDidLoad() {
    this.el.style.setProperty("--color-box-height", this.colorBoxHeight.toString());
  }
  getHex() {
    return this.getDoublet(this.currentColor.red) + this.getDoublet(this.currentColor.green) + this.getDoublet(this.currentColor.blue);
  }
  getContrast() {
    return this.currentColor.contrastColor;
  }
  getDoublet(value) {
    const valueString = value.toString(16).toUpperCase();
    if (valueString.length === 1) {
      return '0' + valueString;
    }
    return valueString;
  }
  handleHexChange(value) {
    const newColor = new ColorInfo();
    if (value.match(/^(?:[\da-f]{3}|[\da-f]{6})$/i).length > 0) {
      if (value.length === 3) {
        let expanded = value[0] + value[0] + value[1] + value[1] + value[2] + value[2];
        value = expanded;
      }
      newColor.red = parseInt(value.substr(0, 2), 16);
      newColor.green = parseInt(value.substr(2, 2), 16);
      newColor.blue = parseInt(value.substr(4, 2), 16);
    }
    else {
      newColor.red = this.currentColor.red;
      newColor.green = this.currentColor.green;
      newColor.blue = this.currentColor.blue;
    }
    this.currentColor = newColor;
  }
  switchColorMode(e) {
    switch (e.target.id) {
      case "rgb-switch":
        this.rgbDisplay = "none";
        this.hslDisplay = "none";
        this.hexDisplay = "flex";
        break;
      case "hex-switch":
        this.rgbDisplay = "none";
        this.hslDisplay = "flex";
        this.hexDisplay = "none";
        break;
      case "hsl-switch":
        this.rgbDisplay = "flex";
        this.hslDisplay = "none";
        this.hexDisplay = "none";
        break;
      default:
        this.rgbDisplay = "flex";
        this.hslDisplay = "none";
        this.hexDisplay = "none";
    }
  }
  render() {
    const hue = this.currentColor.hue;
    const saturation = this.currentColor.saturation;
    const lightness = this.currentColor.lightness;
    const red = this.currentColor.red;
    const green = this.currentColor.green;
    const blue = this.currentColor.blue;
    return (index.h("div", { class: "dnn-color-picker" }, index.h("div", { class: "dnn-color-sliders" }, index.h("div", { class: "dnn-color-s-b", ref: (element) => this.saturationLightnessBox = element, style: { backgroundColor: `hsl(${hue},100%,50%)` }, onMouseDown: this.handleSaturationLightnessMouseDown.bind(this) }, index.h("button", { class: "dnn-s-b-picker", "aria-label": "Press up or down to adjust lightness, left or right to adjust saturation, hold shift to move by 10%", role: "slider", "aria-valuemin": "0", "aria-valuemax": "100", "aria-valuetext": `Saturation: ${Math.round(this.currentColor.saturation * 100)}%, Lightness: ${Math.round(this.currentColor.lightness * 100)}%`, style: {
        left: Math.round(saturation * 100) + "%",
        bottom: Math.round(lightness * 100) + "%"
      }, onKeyDown: (e) => this.handleSaturationLightnessKeyDown(e) })), index.h("div", { class: "dnn-color-bar" }, index.h("div", { class: "dnn-color-result", style: {
        backgroundColor: '#' + this.getHex(),
        boxShadow: "0 0 2px 1px " + "#" + this.getContrast()
      } }), index.h("div", { class: "dnn-color-hue", ref: (element) => this.hueRange = element, onMouseDown: this.handleHueMouseDown.bind(this) }, index.h("button", { class: "dnn-hue-picker", "aria-label": "Press left or right to adjust hue, hold shift to move by 10 degrees", role: "slider", "aria-valuemin": "0", "aria-valuemax": "359", "aria-valuenow": Math.round(hue), style: { left: (hue / 359 * 100).toString() + "%" }, onKeyDown: (e) => this.handleHueKeyDown(e) })))), index.h("div", { class: "dnn-color-fields" }, index.h("div", { class: "dnn-rgb-color-fields", style: { display: this.rgbDisplay } }, index.h("div", { class: "dnn-rgb-color-field" }, index.h("label", null, "R"), index.h("input", { type: "number", min: "0", max: "255", step: "1", class: "red", value: red, "aria-label": "red value", onChange: (e) => this.handleComponentValueChange(e, 'red') })), index.h("div", { class: "dnn-rgb-color-field" }, index.h("label", null, "G"), index.h("input", { type: "number", min: "0", max: "255", class: "green", value: green, "aria-label": "green value", onChange: (e) => this.handleComponentValueChange(e, 'green') })), index.h("div", { class: "dnn-rgb-color-field" }, index.h("label", null, "B"), index.h("input", { type: "number", min: "0", max: "255", class: "blue", value: blue, "aria-label": "blue value", onChange: (e) => this.handleComponentValueChange(e, 'blue') })), index.h("div", { class: "dnn-color-mode-switch" }, index.h("button", { id: "rgb-switch", onClick: this.switchColorMode.bind(this), "aria-label": "switch to hexadecimal value entry" }, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, index.h("path", { d: "M0 0h24v24H0z", fill: "none" }), index.h("path", { d: "M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" }))))), index.h("div", { class: "dnn-hsl-color-fields", style: { display: this.hslDisplay } }, index.h("div", { class: "dnn-hsl-color-field" }, index.h("label", null, "H"), index.h("input", { type: "number", min: "0", max: "359", step: 1, value: Math.round(hue), "aria-label": "Hue", onChange: (e) => this.handleHSLChange(e, 'hue') })), index.h("div", { class: "dnn-hsl-color-field" }, index.h("label", null, "S"), index.h("input", { type: "number", min: "0", max: "100", step: 1, value: Math.round(saturation * 100), "aria-label": "Saturation", onChange: (e) => this.handleHSLChange(e, 'saturation') })), index.h("div", { class: "dnn-hsl-color-field" }, index.h("label", null, "L"), index.h("input", { type: "number", min: "0", max: "100", step: 1, value: Math.round(lightness * 100), "aria-label": "Lightness", onChange: (e) => this.handleHSLChange(e, 'lightness') })), index.h("div", { class: "dnn-color-mode-switch" }, index.h("button", { id: "hsl-switch", onClick: this.switchColorMode.bind(this), "aria-label": "Switch to red, green, blue entry mode" }, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, index.h("path", { d: "M0 0h24v24H0z", fill: "none" }), index.h("path", { d: "M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" }))))), index.h("div", { class: "dnn-hex-color-fields", style: { display: this.hexDisplay } }, index.h("div", { class: "dnn-hex-color-field" }, index.h("label", null, "HEX"), index.h("div", { class: "hex-input" }, index.h("input", { type: "text", "aria-label": "Hexadecimal value", value: this.getHex(), onChange: e => this.handleHexChange(e.target.value) }), index.h("button", { class: "copy", "aria-label": "copy value" }, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, index.h("path", { d: "M0 0h24v24H0z", fill: "none" }), index.h("path", { d: "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" }))))), index.h("div", { class: "dnn-color-mode-switch" }, index.h("button", { id: "hex-switch", onClick: this.switchColorMode.bind(this), "aria-label": "Switch to hue saturation lightness values" }, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, index.h("path", { d: "M0 0h24v24H0z", fill: "none" }), index.h("path", { d: "M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" }))))))));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "currentColor": ["handeCurrentColorChanged"]
  }; }
};
__decorate$1([
  debounce.Debounce(100)
], DnnColorPicker.prototype, "colorChangedHandler", null);
DnnColorPicker.style = dnnColorPickerCss;

const dnnDropzoneCss = ":host{--border-color:var(--dnn-color-tertiary-contrast, lightgray);--border-radius:var(--dnn-controls-radius, 5px);--drop-background-color:var(--dnn-color-tertiary, lightblue);display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;gap:1rem;text-align:center;border:2px dashed var(--border-color);border-radius:var(--border-radius);padding:1rem;-webkit-transition:all 300ms ease-in-out;transition:all 300ms ease-in-out}:host(.dropping){background-color:var(--drop-background-color)}p{margin:0;padding:0}button{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;border:0px;margin:0;padding:0;background-color:transparent}button:hover{cursor:pointer}button svg{margin-right:0.5rem}label.upload-file{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;cursor:pointer}label.upload-file input{display:none}.video-preview{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center}.video-preview button{margin:1rem}";

const DnnDropzone = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.filesSelected = index.createEvent(this, "filesSelected", 7);
    /** Localization strings */
    this.resx = {
      dragAndDropFile: "Drag and drop a file",
      capture: "Capture",
      or: "or",
      takePicture: "Take a picture",
      uploadFile: "Upload a file",
    };
    /**
     * If true, will allow the user to take a snapshot
     * using the device camera. (only works over https).
     */
    this.allowCameraMode = false;
    /**
     * Specifies the jpeg quality for when the device
     * camera is used to generate a picture.
     * Needs to be a number between 0 and 1 and defaults to 0.8
     */
    this.captureQuality = 0.8;
    this.canTakeSnapshots = false;
    this.takingPicture = false;
    this.handleDragOver = (event) => {
      event.stopPropagation();
      event.preventDefault();
      event.dataTransfer.dropEffect = "copy";
      this.dropzone.classList.add("dropping");
    };
    this.handleDrop = (dropEvent) => {
      dropEvent.stopPropagation();
      dropEvent.preventDefault();
      const files = dropEvent.dataTransfer.files;
      if (this.hasInvalidExtensions(files)) {
        return;
      }
      var fileList = this.getFilesFromFileList(files);
      this.filesSelected.emit(fileList);
    };
  }
  componentDidLoad() {
    if (this.allowCameraMode) {
      this.checkIfBrowserCanTakeSnapshots()
        .then(result => this.canTakeSnapshots = result);
    }
    if (this.allowedExtensions != undefined && this.allowedExtensions.length > 0) {
      var extensionsWithDots = this.allowedExtensions.map(e => `.${e}`);
      var extensionsList = extensionsWithDots.join(",");
      this.fileInput.accept = extensionsList;
    }
  }
  checkIfBrowserCanTakeSnapshots() {
    return new Promise((resolve) => {
      const mediaDevices = navigator.mediaDevices;
      if (mediaDevices == undefined || mediaDevices.enumerateDevices == undefined) {
        resolve(false);
      }
      mediaDevices.enumerateDevices()
        .then(devices => {
        var result = devices.some(device => device.kind == "videoinput");
        resolve(result);
      });
    });
  }
  getFilesFromFileList(files) {
    var fileList = [];
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      fileList.push(file);
    }
    return fileList;
  }
  handleUploadButton(element) {
    let files = this.getFilesFromFileList(element.files);
    this.filesSelected.emit(files);
  }
  hasInvalidExtensions(files) {
    var hasInvalid = false;
    for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
      const file = files[fileIndex];
      var regex = /(?:\.([^.]+))?$/;
      const fileExtension = regex.exec(file.name)[1];
      if (fileExtension == undefined) {
        hasInvalid = true;
      }
      if (this.allowedExtensions != undefined && !this.allowedExtensions.includes(fileExtension)) {
        hasInvalid = true;
      }
      return hasInvalid;
    }
  }
  takeSnapshot() {
    this.takingPicture = true;
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(stream => {
      this.videoPreview.srcObject = stream;
      this.videoPreview.play()
        .then(() => {
        this.videoSettings = stream.getVideoTracks()[0].getSettings();
      });
    })
      .catch(error => alert(error));
  }
  applySnapshot() {
    var canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = this.videoSettings.width;
    canvas.height = this.videoSettings.height;
    context.drawImage(this.videoPreview, 0, 0);
    canvas.toBlob(blob => {
      var file = new File([blob], "image.jpeg", { type: "image/jpeg" });
      this.takingPicture = false;
      var fileList = [file];
      this.filesSelected.emit(fileList);
    }, "image/jpeg", this.captureQuality);
  }
  render() {
    var _a, _b, _c, _d, _e, _f;
    return (index.h(index.Host, { ref: e => this.dropzone = e, class: "dropzone", onDragOver: this.handleDragOver, onDrop: this.handleDrop, onDragLeave: () => this.dropzone.classList.remove("dropping") }, !this.takingPicture &&
      [
        index.h("p", null, (_a = this.resx) === null || _a === void 0 ? void 0 : _a.dragAndDropFile),
        index.h("p", null, "- ", (_b = this.resx) === null || _b === void 0 ? void 0 :
          _b.or, " -"),
        index.h("label", { class: "upload-file" }, index.h("input", { type: "file", ref: el => this.fileInput = el, onChange: e => this.handleUploadButton(e.target) }), index.h("span", null, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", "enable-background": "new 0 0 24 24", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, index.h("g", null, index.h("rect", { fill: "none", height: "24", width: "24" })), index.h("g", null, index.h("path", { d: "M5,20h14v-2H5V20z M5,10h4v6h6v-6h4l-7-7L5,10z" })))), "\u00A0", (_c = this.resx) === null || _c === void 0 ? void 0 :
          _c.uploadFile),
        this.canTakeSnapshots &&
          [
            index.h("p", null, "- ", (_d = this.resx) === null || _d === void 0 ? void 0 :
              _d.or, " -"),
            index.h("button", { onClick: () => this.takeSnapshot() }, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, index.h("path", { d: "M0 0h24v24H0z", fill: "none" }), index.h("circle", { cx: "12", cy: "12", r: "3.2" }), index.h("path", { d: "M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" })), (_e = this.resx) === null || _e === void 0 ? void 0 :
              _e.takePicture)
          ]
      ], this.takingPicture &&
      index.h("div", { class: "video-preview" }, index.h("video", { ref: e => this.videoPreview = e }), index.h("button", { onClick: () => this.applySnapshot() }, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, index.h("path", { d: "M0 0h24v24H0z", fill: "none" }), index.h("circle", { cx: "12", cy: "12", r: "3.2" }), index.h("path", { d: "M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" })), "\u00A0", (_f = this.resx) === null || _f === void 0 ? void 0 :
        _f.capture))));
  }
};
DnnDropzone.style = dnnDropzoneCss;

var CornerType;
(function (CornerType) {
  CornerType[CornerType["nw"] = 0] = "nw";
  CornerType[CornerType["ne"] = 1] = "ne";
  CornerType[CornerType["se"] = 2] = "se";
  CornerType[CornerType["sw"] = 3] = "sw";
})(CornerType || (CornerType = {}));

function getMovementFromEvent(event, previousTouch) {
  let movementX = 0;
  let movementY = 0;
  if (event instanceof MouseEvent) {
    movementX = event.movementX;
    movementY = event.movementY;
  }
  if (typeof TouchEvent !== "undefined") {
    if (event instanceof TouchEvent) {
      let touch = event.touches[0];
      if (previousTouch != undefined) {
        movementX = touch.pageX - this.previousTouch.pageX;
        movementY = touch.pageY - this.previousTouch.pageY;
      }
      previousTouch = touch;
    }
  }
  return { movementX, movementY };
}

const dnnImageCropperCss = ":host{display:block}canvas{display:none}.view{visibility:hidden;opacity:0;height:0;overflow:hidden;-webkit-transition:all 300ms ease-in-out;transition:all 300ms ease-in-out}.view.visible{visibility:visible;opacity:1;height:initial;overflow:visible}.view .cropper{position:relative;width:100%}.view .cropper img{width:100%;display:block;margin:0 auto}.view .cropper .backdrop{-webkit-backdrop-filter:saturate(0.5);backdrop-filter:saturate(0.5);-webkit-backdrop-filter:brightness(0.5);backdrop-filter:brightness(0.5);position:absolute;left:0;top:0;width:100%;height:100%}.view .cropper .crop{position:absolute;top:0;left:0;width:100%;height:100%;outline:2px dashed white;-webkit-box-shadow:black 0 0 0px 2px;box-shadow:black 0 0 0px 2px;-webkit-backdrop-filter:saturate(2);backdrop-filter:saturate(2);-webkit-backdrop-filter:brightness(2);backdrop-filter:brightness(2);cursor:move}.view .cropper .crop>div{width:20px;height:20px;background-color:white;border:2px solid rgba(0, 0, 0, 0.5);position:absolute}.view .cropper .crop>div.nw,.view .cropper .crop>div.ne{top:-17px}.view .cropper .crop>div.ne,.view .cropper .crop>div.se{right:-17px}.view .cropper .crop>div.se,.view .cropper .crop>div.sw{bottom:-17px}.view .cropper .crop>div.sw,.view .cropper .crop>div.nw{left:-17px}.view .cropper .crop>div.nw,.view .cropper .crop>div.se{cursor:nwse-resize}.view .cropper .crop>div.ne,.view .cropper .crop>div.sw{cursor:nesw-resize}dnn-modal{--max-width:512px}";

const DnnImageCropper = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.imageCropChanged = index.createEvent(this, "imageCropChanged", 7);
    /** Sets the desired final image width. */
    this.width = 600;
    /** Sets the desired final image height. */
    this.height = 600;
    /** Can be used to customize controls text.
     * Some values support tokens, see default values for examples.
    */
    this.resx = {
      capture: "Capture",
      dragAndDropFile: "Drag and drop an image",
      or: "or",
      takePicture: "Take a picture",
      uploadFile: "Upload an image",
      imageTooSmall: "The image you are attempting to upload does not meet the minimum size requirement of {width} pixels by {height} pixels. Please upload a larger image.",
      modalCloseText: "Close",
    };
    /** Sets the output quality of the corpped image (number between 0 and 1). */
    this.quality = 0.8;
    /** When set to true, prevents cropping an image smaller than the required size, which would blow pixel and make the final picture look blurry. */
    this.preventUndersized = false;
    this.handleCropMouseDown = (event) => {
      event.stopPropagation();
      event.preventDefault();
      const element = event.target;
      const className = element.classList[0];
      document.addEventListener("mouseup", this.handleImageCropFinished, false);
      document.addEventListener("touchend", this.handleImageCropFinished, false);
      switch (className) {
        case "crop":
          document.addEventListener("mousemove", this.handleCropDrag, false);
          document.addEventListener("touchmove", this.handleCropDrag, false);
          document.addEventListener("mouseup", () => document.removeEventListener("mousemove", this.handleCropDrag));
          document.addEventListener("touchend", () => document.removeEventListener("touchmove", this.handleCropDrag));
          break;
        case "nw":
          document.addEventListener("mousemove", this.handleNwMouseMove, false);
          document.addEventListener("touchmove", this.handleNwMouseMove, false);
          document.addEventListener("mouseup", () => document.removeEventListener("mousemove", this.handleNwMouseMove));
          document.addEventListener("touchend", () => document.removeEventListener("touchmove", this.handleNwMouseMove));
          break;
        case "ne":
          document.addEventListener("mousemove", this.handleNeMouseMove, false);
          document.addEventListener("touchmove", this.handleNeMouseMove, false);
          document.addEventListener("mouseup", () => document.removeEventListener("mousemove", this.handleNeMouseMove));
          document.addEventListener("touchend", () => document.removeEventListener("touchmove", this.handleNeMouseMove));
          break;
        case "se":
          document.addEventListener("mousemove", this.handleSeMouseMove, false);
          document.addEventListener("touchmove", this.handleSeMouseMove, false);
          document.addEventListener("mouseup", () => document.removeEventListener("mousemove", this.handleSeMouseMove));
          document.addEventListener("touchend", () => document.removeEventListener("touchmove", this.handleSeMouseMove));
          break;
        case "sw":
          document.addEventListener("mousemove", this.handleSwMouseMove, false);
          document.addEventListener("touchmove", this.handleSwMouseMove, false);
          document.addEventListener("mouseup", () => document.removeEventListener("mousemove", this.handleSwMouseMove));
          document.addEventListener("touchend", () => document.removeEventListener("touchmove", this.handleSwMouseMove));
          break;
      }
    };
    this.handleImageCropFinished = (_ev) => {
      this.emitImage();
      document.removeEventListener("mouseup", this.handleImageCropFinished);
      this.previousTouch = undefined;
    };
    this.handleNwMouseMove = (event) => {
      this.handleCornerDrag(event, CornerType.nw);
    };
    this.handleNeMouseMove = (event) => {
      this.handleCornerDrag(event, CornerType.ne);
    };
    this.handleSeMouseMove = (event) => {
      this.handleCornerDrag(event, CornerType.se);
    };
    this.handleSwMouseMove = (event) => {
      this.handleCornerDrag(event, CornerType.sw);
    };
    this.handleCornerDrag = (event, corner) => {
      if (!this.isMouseStillInTarget(event)) {
        return;
      }
      let { left, top } = this.getCornerLeftTop(corner);
      let newWidth = 0;
      let newHeight = 0;
      let orientation = "horizontal";
      const wantedRatio = this.width / this.height;
      const cropRect = this.crop.getBoundingClientRect();
      const imageRect = this.image.getBoundingClientRect();
      let { movementX, movementY } = getMovementFromEvent(event, this.previousTouch);
      if (Math.abs(movementX) < Math.abs(movementY)) {
        orientation = "vertical";
      }
      if (orientation == "horizontal") {
        switch (corner) {
          case CornerType.nw:
          case CornerType.sw:
            newWidth = cropRect.width - movementX;
            newHeight = newWidth / wantedRatio;
            break;
          case CornerType.ne:
          case CornerType.se:
            newWidth = cropRect.width + movementX;
            newHeight = newWidth / wantedRatio;
            break;
        }
      }
      else {
        switch (corner) {
          case CornerType.nw:
          case CornerType.ne:
            newHeight = cropRect.height - movementY;
            newWidth = newHeight * wantedRatio;
            break;
          case CornerType.se:
          case CornerType.sw:
            newHeight = cropRect.height + movementY;
            newWidth = newHeight * wantedRatio;
            break;
        }
      }
      switch (corner) {
        case CornerType.ne:
        case CornerType.nw:
          const topOffset = cropRect.height - newHeight;
          top = this.crop.offsetTop + topOffset;
      }
      switch (corner) {
        case CornerType.nw:
        case CornerType.sw:
          const leftOffset = cropRect.width - newWidth;
          left = this.crop.offsetLeft + leftOffset;
          if (left < 0)
            left = 0;
          if (left > imageRect.width)
            left = imageRect.width;
          if (top < 0)
            top = 0;
          if (top > imageRect.height)
            top = imageRect.height;
          if (left + newWidth > imageRect.width)
            newWidth = imageRect.width - left;
          if (top + newHeight > imageRect.height)
            newHeight = imageRect.height - top;
          break;
        case CornerType.ne:
        case CornerType.se:
          if (top < 0)
            top = 0;
          if (top > imageRect.height)
            top = imageRect.height;
          if (left + newWidth > imageRect.width)
            newWidth = imageRect.width - left;
          if (top + newHeight > imageRect.height)
            newHeight = imageRect.height - top;
          break;
      }
      if (newWidth / newHeight != wantedRatio) {
        return;
      }
      if (this.preventUndersized) {
        const zoomRatio = this.image.width / this.image.naturalWidth;
        if (newWidth / zoomRatio < this.width || newHeight / zoomRatio < this.height) {
          return;
        }
      }
      switch (corner) {
        case CornerType.ne:
          this.crop.style.top = `${top}px`;
          this.crop.style.width = `${newWidth}px`;
          this.crop.style.height = `${newHeight}px`;
          break;
        case CornerType.nw:
          this.crop.style.left = `${left}px`;
          this.crop.style.top = `${top}px`;
          this.crop.style.width = `${newWidth}px`;
          this.crop.style.height = `${newHeight}px`;
          break;
        case CornerType.se:
          this.crop.style.width = `${newWidth}px`;
          this.crop.style.height = `${newHeight}px`;
          break;
        case CornerType.sw:
          this.crop.style.left = `${left}px`;
          this.crop.style.width = `${newWidth}px`;
          this.crop.style.height = `${newHeight}px`;
          break;
      }
    };
    this.handleCropDrag = (ev) => {
      if (!this.isMouseStillInTarget(ev)) {
        return;
      }
      let { movementX, movementY } = getMovementFromEvent(ev, this.previousTouch);
      let newLeft = this.crop.offsetLeft + movementX;
      let newTop = this.crop.offsetTop + movementY;
      var imageRect = this.image.getBoundingClientRect();
      var cropRect = this.crop.getBoundingClientRect();
      if (newLeft < 0) {
        newLeft = 0;
      }
      if (newTop < 0) {
        newTop = 0;
      }
      if (newLeft + cropRect.width > imageRect.width) {
        newLeft = this.crop.offsetLeft;
      }
      if (newTop + cropRect.height > imageRect.height) {
        newTop = this.crop.offsetTop;
      }
      this.crop.style.left = newLeft + "px";
      this.crop.style.top = newTop + "px";
    };
  }
  componentDidLoad() {
    requestAnimationFrame(() => {
      this.setView("noPictureView");
    });
  }
  setView(newView) {
    const views = this.host.shadowRoot.querySelectorAll(".view");
    views.forEach(v => v.classList.remove("visible"));
    switch (newView) {
      case "noPictureView":
        this.noPictureView.classList.add("visible");
        break;
      case "hasPictureView":
        this.hasPictureView.classList.add("visible");
        break;
    }
    this.view = newView;
  }
  initCrop() {
    var wantedRatio = this.width / this.height;
    var imageRect = this.image.getBoundingClientRect();
    var imageRatio = imageRect.width / imageRect.height;
    if (wantedRatio > imageRatio) {
      var wantedHeight = imageRect.width / wantedRatio;
      var diff = imageRect.height - wantedHeight;
      this.crop.style.top = Math.round(diff / 2).toString() + "px";
      this.crop.style.height = Math.round(wantedHeight).toString() + "px";
    }
    else {
      var wantedWidth = imageRect.height * wantedRatio;
      var diff = imageRect.width - wantedWidth;
      this.crop.style.left = Math.round(diff / 2).toString() + "px";
      this.crop.style.width = Math.round(wantedWidth).toString() + "px";
    }
  }
  setImage() {
    this.image.addEventListener('load', () => {
      this.initCrop();
      this.emitImage();
    });
    this.image.src = this.canvas.toDataURL();
  }
  handleNewFile(file) {
    if (file.type.split('/')[0] != "image") {
      return;
    }
    var reader = new FileReader();
    reader.onload = readerLoadEvent => {
      var img = new Image();
      img.onload = () => {
        this.canvas.width = img.width;
        this.canvas.height = img.height;
        if (this.preventUndersized && (img.width < this.width || img.height < this.height)) {
          this.imageTooSmallModal.show();
          return;
        }
        var ctx = this.canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        this.setView("hasPictureView");
        this.setImage();
      };
      img.src = readerLoadEvent.target.result.toString();
    };
    reader.readAsDataURL(file);
  }
  emitImage() {
    var x = this.crop.offsetLeft / this.image.width * this.image.naturalWidth;
    var y = this.crop.offsetTop / this.image.height * this.image.naturalHeight;
    var cropRect = this.crop.getBoundingClientRect();
    var width = cropRect.width / this.image.width * this.image.naturalWidth;
    var height = cropRect.height / this.image.height * this.image.naturalHeight;
    if (x < 0)
      x = 0;
    if (x > this.image.naturalWidth)
      x = this.image.naturalWidth;
    if (y < 0)
      y = 0;
    if (y > this.image.naturalWidth)
      y = this.image.naturalWidth;
    if (width > this.image.naturalWidth)
      width = this.image.naturalWidth;
    if (height > this.image.naturalHeight)
      height = this.image.naturalHeight;
    var dataUrl = this.generateCroppedImage(x, y, width, height, this.width, this.height);
    this.imageCropChanged.emit(dataUrl);
  }
  generateCroppedImage(x, y, width, height, desiredWidth, desiredHeight) {
    this.canvas.width = desiredWidth;
    this.canvas.height = desiredHeight;
    const context = this.canvas.getContext("2d");
    context.clearRect(0, 0, desiredWidth, desiredHeight);
    context.drawImage(this.image, x, y, width, height, 0, 0, desiredWidth, desiredHeight);
    return this.canvas.toDataURL("image/jpeg", this.quality);
  }
  getCornerLeftTop(corner) {
    let left = 0;
    let top = 0;
    switch (corner) {
      case CornerType.se:
        left = this.crop.offsetLeft;
        top = this.crop.offsetTop;
        break;
      case CornerType.sw:
        top = this.crop.offsetTop;
        break;
    }
    return { top, left };
  }
  isMouseStillInTarget(event) {
    var inside = false;
    let mouseX;
    let mouseY;
    const imageRect = this.image.getBoundingClientRect();
    if (event instanceof MouseEvent) {
      mouseX = event.clientX;
      mouseY = event.clientY;
    }
    if (typeof TouchEvent !== "undefined") {
      if (event instanceof TouchEvent) {
        var touch = event.touches[0];
        mouseX = touch.clientX;
        mouseY = touch.clientY;
      }
    }
    if (mouseX >= imageRect.x &&
      mouseY >= imageRect.y &&
      mouseX <= imageRect.left + imageRect.width &&
      mouseY <= imageRect.top + imageRect.height) {
      inside = true;
    }
    var corners = this.crop.querySelectorAll("div");
    corners.forEach(corner => {
      var cornerRect = corner.getBoundingClientRect();
      if (mouseX >= cornerRect.x &&
        mouseY >= cornerRect.y &&
        mouseX <= cornerRect.left + cornerRect.width &&
        mouseY <= cornerRect.top + cornerRect.height) {
        inside = true;
      }
    });
    return inside;
  }
  render() {
    return (index.h(index.Host, { ref: el => this.host = el }, index.h("canvas", { ref: el => this.canvas = el }), index.h("div", { class: "view", ref: el => this.hasPictureView = el }, index.h("div", { class: "cropper" }, index.h("img", { ref: el => this.image = el }), index.h("div", { class: "backdrop" }), index.h("div", { class: "crop", ref: e => this.crop = e, onMouseDown: this.handleCropMouseDown, onTouchStart: this.handleCropMouseDown }, index.h("div", { class: "nw" }), index.h("div", { class: "ne" }), index.h("div", { class: "se" }), index.h("div", { class: "sw" })))), index.h("div", { class: "view", ref: el => this.noPictureView = el }, index.h("dnn-dropzone", { allowCameraMode: true, onFilesSelected: e => this.handleNewFile(e.detail[0]), resx: {
        capture: this.resx.capture,
        dragAndDropFile: this.resx.dragAndDropFile,
        or: this.resx.or,
        takePicture: this.resx.takePicture,
        uploadFile: this.resx.uploadFile,
      } })), index.h("dnn-modal", { ref: el => this.imageTooSmallModal = el, "close-text": this.resx.modalCloseText }, index.h("p", null, this.resx.imageTooSmall.replace("{width}", this.width.toString()).replace("{height}", this.height.toString())))));
  }
};
DnnImageCropper.style = dnnImageCropperCss;

const dnnModalCss = ":host{display:block}:host .overlay{background-color:rgba(0, 0, 0, 0.5);position:fixed;top:0;left:0;width:100%;height:100%;z-index:1;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);-webkit-transition:all 300ms ease-in-out;transition:all 300ms ease-in-out;visibility:hidden;opacity:0}:host .overlay .modal{max-width:var(--max-width, 1200px);background-color:white;padding:30px;-webkit-transform:scale(2);transform:scale(2);-webkit-transition:all 300ms ease-in-out;transition:all 300ms ease-in-out;z-index:2;position:relative;margin:10%;max-height:80%;border-radius:var(--dnn-controls-radius, 5px);-webkit-box-shadow:10px 10px 20px 0 rgba(0, 0, 0, 0.5);box-shadow:10px 10px 20px 0 rgba(0, 0, 0, 0.5);display:block}:host .overlay .modal .close{position:absolute;background-color:white;border:2px solid white;border-radius:50%;padding:0;margin:0;top:-12px;right:-12px;outline:none;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}:host .overlay .modal .close:focus,:host .overlay .modal .close:hover{-webkit-box-shadow:0 0 2px 2px var(--dnn-color-primary, blue);box-shadow:0 0 2px 2px var(--dnn-color-primary, blue)}:host .overlay .modal .close svg{width:24px;height:24px;color:grey}:host .overlay.visible{visibility:visible;opacity:1}:host .overlay.visible .modal{-webkit-transform:scale(1);transform:scale(1);-webkit-box-shadow:4px 4px 10px 0px rgba(0, 0, 0, 0.5);box-shadow:4px 4px 10px 0px rgba(0, 0, 0, 0.5);display:block}";

const DnnModal = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.dismissed = index.createEvent(this, "dismissed", 7);
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
    /**
     * Reflects the visible state of the modal.
     */
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
    return (index.h(index.Host, null, index.h("div", { id: "backdrop", class: this.visible ? 'overlay visible' : 'overlay', onClick: e => this.handleBackdropClick(e) }, index.h("div", { class: "modal" }, this.showCloseButton &&
      index.h("button", { class: "close", "aria-label": this.closeText, onClick: () => this.handleDismiss() }, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, index.h("path", { d: "M0 0h24v24H0z", fill: "none" }), index.h("path", { d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" }))), index.h("slot", null)))));
  }
  get el() { return index.getElement(this); }
};
DnnModal.style = dnnModalCss;

const dnnPermissionsGridCss = ":host{display:block}.add-role-row{display:-ms-flexbox;display:flex;gap:1em;-ms-flex-align:center;align-items:center;-ms-flex-wrap:wrap;flex-wrap:wrap}.add-role-row label{margin-right:0.5em}.search-user{display:-ms-flexbox;display:flex;gap:1em;margin-top:1em}.search-user .search-control{position:relative}.search-user .search-control dnn-collapsible{position:absolute;left:0;top:calc(100% - 2px);width:100%;-webkit-box-shadow:0px 4px 4px;box-shadow:0px 4px 4px}.search-user .search-control dnn-collapsible .dropdown{background-color:white;border:1px solid lightgray;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.search-user .search-control dnn-collapsible .dropdown button{background-color:transparent;border:none;border-bottom:1px solid lightgray;padding:0.25em;margin:0;text-align:left}table{border:1px solid lightgray;border-collapse:collapse;margin-top:1em}table thead{text-align:center}table thead tr{border-bottom:1px solid lightgray}table thead th{background-color:lightgray;padding:0.25em 0.5em}table thead th:first-child{border-right:1px solid lightgray}table tbody tr{border-bottom:1px dotted lightgray}table tbody tr th{text-align:left;border-right:1px solid lightgray;padding:0 0.5em}table tbody tr td{text-align:center}table tbody tr td dnn-checkbox span{display:none}table tbody tr td button{background-color:transparent;border:0;padding:0;margin:0;margin-right:1em}";

const DnnPermissionsGrid = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.userSearchQueryChanged = index.createEvent(this, "userSearchQueryChanged", 7);
    this.permissionsChanged = index.createEvent(this, "permissionsChanged", 7);
    /** Optionally allows localizing the component strings. */
    this.resx = {
      Add: "Add",
      AllRoles: "All Roles",
      FilterByGroup: "Filter By Group",
      GlobalRoles: "Global Roles",
      Role: "Role",
      RolePermissions: "Role Permissions",
      SelectRole: "Select Role",
      User: "User",
      UserPermissions: "User Permissions",
    };
    /** The list of users to show under the search users field when a search is performed. */
    this.foundUsers = [];
    this.selectedRoleGroupId = -1;
  }
  handleFoundUsersChanged(newValue) {
    if ((newValue === null || newValue === void 0 ? void 0 : newValue.length) > 0) {
      setTimeout(() => {
        this.userCollapsible.expanded = true;
      }, 100);
    }
  }
  componentWillLoad() {
    document.addEventListener("click", this.dismissUserResults.bind(this));
  }
  disconnectedCallback() {
    document.removeEventListener("click", this.disconnectedCallback.bind(this));
  }
  dismissUserResults(e) {
    const dropdownRect = this.roleDropDown.getBoundingClientRect();
    if (e.pageX > dropdownRect.right ||
      e.pageX < dropdownRect.left ||
      e.pageY > dropdownRect.bottom ||
      e.pageY < dropdownRect.top) {
      this.userCollapsible.expanded = false;
    }
  }
  handleRoleGroupChanged(dropdown) {
    const index = dropdown.selectedIndex;
    const value = Number.parseInt(dropdown.options[index].value);
    this.selectedRoleGroupId = value;
  }
  addRole() {
    const roleId = Number.parseInt(this.roleDropDown.options[this.roleDropDown.selectedIndex].value);
    const role = this.roles.filter(r => r.RoleId == roleId)[0];
    this.permissions = Object.assign(Object.assign({}, this.permissions), { rolePermissions: [
        ...this.permissions.rolePermissions,
        {
          default: false,
          locked: false,
          permissions: [],
          roleId: role.RoleId,
          roleName: role.RoleName,
        }
      ] });
    this.permissionsChanged.emit(this.permissions);
  }
  addUser() {
    if (this.pickedUser != undefined) {
      this.permissions = Object.assign(Object.assign({}, this.permissions), { userPermissions: [
          ...this.permissions.userPermissions,
          {
            displayName: this.pickedUser.displayName,
            permissions: [],
            userId: this.pickedUser.userId,
          },
        ] });
      this.pickedUser = undefined;
      this.userQuery = "";
      this.permissionsChanged.emit(this.permissions);
    }
  }
  getRoles() {
    const filteredRoles = this.roles.filter(role => !this.permissions.rolePermissions.some(rp => rp.roleId == role.RoleId));
    if (this.selectedRoleGroupId == -2) {
      // All Roles
      return filteredRoles;
    }
    if (this.selectedRoleGroupId == -1) {
      // Global Roles
      return filteredRoles.filter(role => role.IsSystemRole);
    }
    return filteredRoles.filter(role => role.RoleGroupId == this.selectedRoleGroupId);
  }
  renderRoleCheckBox(rolePermission, permissionDefinition) {
    const item = rolePermission.permissions.filter(permission => permission.permissionId == permissionDefinition.permissionId)[0];
    if (rolePermission.locked) {
      return (index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, index.h("g", { fill: "none" }, index.h("path", { d: "M0 0h24v24H0V0z" }), index.h("path", { d: "M0 0h24v24H0V0z", opacity: ".87" })), index.h("path", { d: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" })));
    }
    const checked = item == undefined ? "intermediate" : item.allowAccess ? "checked" : "unchecked";
    return (index.h("dnn-checkbox", { "use-intermediate": true, checked: checked, onCheckedchange: e => this.handleRoleChanged(e.detail, rolePermission, permissionDefinition) }, index.h("div", { slot: "intermediateicon" }, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, index.h("path", { d: "M0 0h24v24H0V0z", fill: "none" }), index.h("path", { d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" }))), index.h("div", { slot: "uncheckedicon" }, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, index.h("path", { d: "M0 0h24v24H0V0z", fill: "none" }), index.h("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z" }))), index.h("span", null, permissionDefinition.permissionName)));
  }
  renderUserCheckBox(userPermission, permissionDefinition) {
    const item = userPermission.permissions.filter(permission => permission.permissionId == permissionDefinition.permissionId)[0];
    const checked = item == undefined ? "intermediate" : item.allowAccess ? "checked" : "unchecked";
    return (index.h("dnn-checkbox", { "use-intermediate": true, checked: checked, onCheckedchange: e => this.handleUserChanged(e.detail, userPermission, permissionDefinition) }, index.h("div", { slot: "intermediateicon" }, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, index.h("path", { d: "M0 0h24v24H0V0z", fill: "none" }), index.h("path", { d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" }))), index.h("div", { slot: "uncheckedicon" }, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, index.h("path", { d: "M0 0h24v24H0V0z", fill: "none" }), index.h("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z" }))), index.h("span", null, permissionDefinition.permissionName)));
  }
  handleRoleChanged(checked, rolePermission, permissionDefinition) {
    switch (checked) {
      case "unchecked":
        this.permissions = Object.assign(Object.assign({}, this.permissions), { rolePermissions: [
            ...this.permissions.rolePermissions.map(r => {
              if (r.roleId != rolePermission.roleId) {
                return r;
              }
              const newRolePermission = Object.assign({}, r);
              newRolePermission.permissions = [
                ...newRolePermission.permissions.filter(p => p.permissionId != permissionDefinition.permissionId),
                {
                  allowAccess: false,
                  fullControl: false,
                  permissionCode: permissionDefinition.permissionCode,
                  permissionId: permissionDefinition.permissionId,
                  permissionKey: permissionDefinition.permissionKey,
                  permissionName: permissionDefinition.permissionName,
                  view: false,
                },
              ];
              return newRolePermission;
            }),
          ] });
        break;
      case "checked":
        this.permissions = Object.assign(Object.assign({}, this.permissions), { rolePermissions: [
            ...this.permissions.rolePermissions.map(r => {
              if (r.roleId != rolePermission.roleId) {
                return r;
              }
              const newRolePermission = Object.assign({}, r);
              newRolePermission.permissions = [
                ...newRolePermission.permissions.filter(p => p.permissionId != permissionDefinition.permissionId),
                {
                  allowAccess: true,
                  fullControl: false,
                  permissionCode: permissionDefinition.permissionCode,
                  permissionId: permissionDefinition.permissionId,
                  permissionKey: permissionDefinition.permissionKey,
                  permissionName: permissionDefinition.permissionName,
                  view: false,
                },
              ];
              return newRolePermission;
            }),
          ] });
        break;
      case "intermediate":
        this.permissions = Object.assign(Object.assign({}, this.permissions), { rolePermissions: [
            ...this.permissions.rolePermissions.map(r => {
              if (r.roleId != rolePermission.roleId) {
                return r;
              }
              const newRolePermission = Object.assign({}, r);
              newRolePermission.permissions = [
                ...newRolePermission.permissions.filter(p => p.permissionId != permissionDefinition.permissionId),
              ];
              return newRolePermission;
            }),
          ] });
        break;
    }
    this.permissionsChanged.emit(this.permissions);
  }
  handleUserChanged(checked, userPermission, permissionDefinition) {
    switch (checked) {
      case "unchecked":
        this.permissions = Object.assign(Object.assign({}, this.permissions), { userPermissions: [
            ...this.permissions.userPermissions.map(u => {
              if (u.userId != userPermission.userId) {
                return u;
              }
              const newUserPermission = Object.assign({}, u);
              newUserPermission.permissions = [
                ...newUserPermission.permissions.filter(p => p.permissionId != permissionDefinition.permissionId),
                {
                  allowAccess: false,
                  fullControl: false,
                  permissionCode: permissionDefinition.permissionCode,
                  permissionId: permissionDefinition.permissionId,
                  permissionKey: permissionDefinition.permissionKey,
                  permissionName: permissionDefinition.permissionName,
                  view: false,
                },
              ];
              return newUserPermission;
            }),
          ] });
        break;
      case "checked":
        this.permissions = Object.assign(Object.assign({}, this.permissions), { userPermissions: [
            ...this.permissions.userPermissions.map(u => {
              if (u.userId != userPermission.userId) {
                return u;
              }
              const newUserPermission = Object.assign({}, u);
              newUserPermission.permissions = [
                ...newUserPermission.permissions.filter(p => p.permissionId != permissionDefinition.permissionId),
                {
                  allowAccess: true,
                  fullControl: false,
                  permissionCode: permissionDefinition.permissionCode,
                  permissionId: permissionDefinition.permissionId,
                  permissionKey: permissionDefinition.permissionKey,
                  permissionName: permissionDefinition.permissionName,
                  view: false,
                },
              ];
              return newUserPermission;
            }),
          ] });
        break;
      case "intermediate":
        this.permissions = Object.assign(Object.assign({}, this.permissions), { userPermissions: [
            ...this.permissions.userPermissions.map(u => {
              if (u.userId != userPermission.userId) {
                return u;
              }
              const newUserPermission = Object.assign({}, u);
              newUserPermission.permissions = [
                ...newUserPermission.permissions.filter(p => p.permissionId != permissionDefinition.permissionId),
              ];
              return newUserPermission;
            }),
          ] });
        break;
    }
    this.permissionsChanged.emit(this.permissions);
  }
  removeRole(rolePermission) {
    this.permissions = Object.assign(Object.assign({}, this.permissions), { rolePermissions: [
        ...this.permissions.rolePermissions.filter(rp => rp.roleId != rolePermission.roleId),
      ] });
    this.permissionsChanged.emit();
  }
  removeUser(userPermission) {
    this.permissions = Object.assign(Object.assign({}, this.permissions), { userPermissions: [
        ...this.permissions.userPermissions.filter(up => up.userId != userPermission.userId),
      ] });
    this.permissionsChanged.emit(this.permissions);
  }
  handleQueryChanged(query) {
    this.userQuery = query;
    if (query == undefined || query.length == 0) {
      this.userCollapsible.expanded = false;
      this.pickedUser = undefined;
      this.foundUsers = [];
      return;
    }
    this.userSearchQueryChanged.emit(query);
  }
  handleSearchUserFieldKeyDown(e) {
    if (e.key != "ArrowDown") {
      return;
    }
    e.preventDefault();
    const firstButton = this.userCollapsible.querySelector("button");
    if (firstButton != undefined) {
      firstButton.focus();
    }
  }
  handleSearchedUserKeyDown(e) {
    const button = e.target;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        const nextButton = button.nextElementSibling;
        nextButton === null || nextButton === void 0 ? void 0 : nextButton.focus();
        break;
      case "ArrowUp":
        e.preventDefault();
        const previousButton = button.previousElementSibling;
        previousButton === null || previousButton === void 0 ? void 0 : previousButton.focus();
        break;
    }
  }
  handleUserPicked(searchedUser) {
    this.userQuery = searchedUser.displayName;
    this.pickedUser = searchedUser;
  }
  getFilteredUsers() {
    return this.foundUsers.filter(fu => !this.permissions.userPermissions.some(up => up.userId == fu.userId));
  }
  render() {
    const filteredRoles = this.getRoles();
    return (index.h(index.Host, null, index.h("div", { class: "add-role-row" }, index.h("div", { class: "dropdown" }, index.h("label", null, this.resx.FilterByGroup, " :"), index.h("select", { onChange: e => this.handleRoleGroupChanged(e.target) }, index.h("option", { value: -2, selected: this.selectedRoleGroupId == -2 }, this.resx.AllRoles), index.h("option", { value: -1, selected: this.selectedRoleGroupId == -1 }, this.resx.GlobalRoles), this.roleGroups.map(roleGroup => index.h("option", { value: roleGroup.id, selected: this.selectedRoleGroupId == roleGroup.id }, roleGroup.name)))), filteredRoles && filteredRoles.length > 0 && [
      index.h("div", { class: "dropdown" }, index.h("label", null, this.resx.SelectRole, " :"), index.h("select", { ref: el => this.roleDropDown = el }, this.getRoles().map(role => index.h("option", { value: role.RoleId }, role.RoleName)))),
      index.h("dnn-button", { type: "primary", onClick: () => this.addRole() }, this.resx.Add)
    ]), index.h("table", { class: "roles-table" }, index.h("caption", null, this.resx.RolePermissions), index.h("thead", null, index.h("tr", null, index.h("th", null, this.resx.Role), this.permissions.permissionDefinitions.map(permissionDefinition => index.h("th", null, permissionDefinition.permissionName)), index.h("th", null, "\u00A0"))), index.h("tbody", null, this.permissions.rolePermissions.map(rolePermission => index.h("tr", null, index.h("th", null, rolePermission.roleName), this.permissions.permissionDefinitions.map(permissionDefinition => index.h("td", null, this.renderRoleCheckBox(rolePermission, permissionDefinition))), index.h("td", null, !rolePermission.default &&
      index.h("button", { onClick: () => this.removeRole(rolePermission) }, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, index.h("path", { d: "M0 0h24v24H0V0z", fill: "none" }), index.h("path", { d: "M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" })))))))), index.h("div", { class: "search-user" }, index.h("div", { class: "search-control" }, index.h("dnn-searchbox", { placeholder: this.resx.User, debounced: true, onQueryChanged: e => this.handleQueryChanged(e.detail), onKeyDown: e => this.handleSearchUserFieldKeyDown(e), query: this.userQuery }), index.h("dnn-collapsible", { ref: el => this.userCollapsible = el }, index.h("div", { class: "dropdown" }, this.getFilteredUsers().map(searchedUser => index.h("button", { onKeyDown: e => this.handleSearchedUserKeyDown(e), onClick: () => this.handleUserPicked(searchedUser) }, searchedUser.displayName))))), this.pickedUser &&
      index.h("dnn-button", { onClick: () => this.addUser() }, this.resx.Add)), this.permissions.userPermissions && this.permissions.userPermissions.length > 0 &&
      index.h("table", { class: "users-table" }, index.h("caption", null, this.resx.UserPermissions), index.h("thead", null, index.h("tr", null, index.h("th", null, this.resx.User), this.permissions.permissionDefinitions.map(permissionDefinition => index.h("th", null, permissionDefinition.permissionName)), index.h("th", null, "\u00A0"))), index.h("tbody", null, this.permissions.userPermissions.map(userPermission => index.h("tr", null, index.h("th", null, userPermission.displayName), this.permissions.permissionDefinitions.map(permissionDefinition => index.h("td", null, this.renderUserCheckBox(userPermission, permissionDefinition))), index.h("td", null, index.h("button", { onClick: () => this.removeUser(userPermission) }, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, index.h("path", { d: "M0 0h24v24H0V0z", fill: "none" }), index.h("path", { d: "M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" }))))))))));
  }
  static get watchers() { return {
    "foundUsers": ["handleFoundUsersChanged"]
  }; }
};
DnnPermissionsGrid.style = dnnPermissionsGridCss;

const dnnSearchboxCss = ":host{position:relative;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;--background-color:transparent;--color:#333;--border-size:1px;--border-color:grey;--border-active-color:black;--border-radius:var(--dnn-controls-radius, 5px);--padding:var(--dnn-controls-padding, 5px);--focus-color:var(--dnn-color-primary, blue)}:host input{width:100%;border:var(--border-size) solid var(--border-color);outline:none;border-radius:var(--border-radius);padding:var(--padding);padding-right:32px;-webkit-transition:all 300ms ease-in-out;transition:all 300ms ease-in-out}:host input:focus,:host input:hover{outline:none;-webkit-box-shadow:0 0 2px 2px var(--focus-color);box-shadow:0 0 2px 2px var(--focus-color)}:host svg{position:absolute;top:0;right:0;height:100%;-webkit-transform:scale(0.7);transform:scale(0.7);fill:var(--color);outline:var(--color);color:var(--color);-webkit-transition:all 300ms ease-in-out;transition:all 300ms ease-in-out}:host button{background:transparent;border:0;margin:0;padding:0}:host button:focus svg,:host button:hover svg{fill:var(--focus-color);outline:var(--focus-color);color:var(--focus-color)}";

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
const DnnSearchbox = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.queryChanged = index.createEvent(this, "queryChanged", 7);
    /**
     * Sets the field placeholder text.
     */
    this.placeholder = "";
    /**
     * Debounces the queryChanged by 500ms.
     */
    this.debounced = true;
    /** Sets the query */
    this.query = "";
  }
  fireQueryChanged() {
    if (this.debounced) {
      this.debouncedHandleQueryChanged();
    }
    else {
      this.handleQueryChanged();
    }
  }
  handleQueryChanged() {
    this.queryChanged.emit(this.query);
  }
  debouncedHandleQueryChanged() {
    this.handleQueryChanged();
  }
  render() {
    return (index.h(index.Host, null, index.h("input", { type: "text", value: this.query, placeholder: this.placeholder, onInput: e => this.query = e.target.value }), this.query !== "" ?
      index.h("button", { class: "svg clear", onClick: () => this.query = "" }, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, index.h("path", { d: "M0 0h24v24H0z", fill: "none" }), index.h("path", { d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" })))
      :
        index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, index.h("path", { d: "M0 0h24v24H0z", fill: "none" }), index.h("path", { d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" }))));
  }
  static get watchers() { return {
    "query": ["fireQueryChanged"]
  }; }
};
__decorate([
  debounce.Debounce(500)
], DnnSearchbox.prototype, "debouncedHandleQueryChanged", null);
DnnSearchbox.style = dnnSearchboxCss;

const dnnSortIconCss = ":host{--color:#888;--color-sorted:var(--dnn-color-primary, rgb(2,139,255));--color-hover:var(--dnn-color-primary-light, #36a1ff);display:inline-block}button{outline:none;border:none;margin:0;padding:0;background-color:transparent;outline:none;display:inline-block;line-height:1em;position:relative;top:0.25em}button svg{height:1.5em;width:auto;fill:var(--color)}button.active svg{fill:var(--color-sorted)}button:hover svg,button:focus svg{fill:var(--color-hover)}";

const DnnSortIcon = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.sortChanged = index.createEvent(this, "sortChanged", 7);
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
    }
    this.sortChanged.emit(this.sortDirection);
  }
  render() {
    return (index.h(index.Host, null, index.h("button", { class: { "active": this.sortDirection != "none" }, onClick: () => this.changeSort() }, this.sortDirection == "none" &&
      index.h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 12 16" }, index.h("path", { d: "M 0 7 H 12 L 6 0 Z M 0 9 H 12 L 6 16 Z" })), this.sortDirection == "asc" &&
      index.h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 12 16" }, index.h("path", { d: "M 0 7 H 12 L 6 0 Z" })), this.sortDirection == "desc" &&
      index.h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 12 16" }, index.h("path", { d: "M 0 9 H 12 L 6 16 Z" })))));
  }
};
DnnSortIcon.style = dnnSortIconCss;

const dnnTabCss = "";

const DnnTab = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
    return (index.h(index.Host, null, this.visible &&
      index.h("slot", null)));
  }
};
DnnTab.style = dnnTabCss;

const dnnTabsCss = ":host{display:block;--color-background:var(--dnn-color-secondary-dark, lightgray);--color-text:var(--dnn-color-secondary-contrast, #333);--color-visible:var(--dnn-color-primary, #3792ED);--color-visible-text:var(--dnn-color-primary-contrast, #FFF);--color-focus:var(--dnn-color-primary, #3792ed)}.tabTitles{display:-ms-flexbox;display:flex;background-color:var(--color-background);color:var(--color-text)}.tabTitles button{padding:0.5rem 1rem;border:0;margin:0;background-color:transparent}.tabTitles button.visible{background-color:var(--color-visible);color:var(--color-bisible-text)}.tabTitles button:focus,.tabTitles button:hover{outline:none;-webkit-box-shadow:0 0 2px 2px var(--color-focus);box-shadow:0 0 2px 2px var(--color-focus)}.currentTab{border:1px solid var(--color-background);padding:1rem}";

const DnnTabs = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.tabTitles = [];
    this.selectedTabTitle = "";
  }
  componentDidLoad() {
    requestAnimationFrame(() => {
      this.updateTitles();
      this.showFirstTab();
    });
  }
  getTabs() {
    return this.component.shadowRoot.querySelector("slot").assignedElements();
  }
  updateTitles() {
    const tabs = this.getTabs();
    tabs.forEach(tab => this.tabTitles = [...this.tabTitles, tab.tabTitle]);
  }
  showFirstTab() {
    const tab = this.getTabs()[0];
    tab.show();
    this.selectedTabTitle = tab.tabTitle;
  }
  showTab(tabTitle) {
    const tabs = this.getTabs();
    tabs.forEach(tab => {
      if (tab.tabTitle == tabTitle) {
        tab.show();
        return;
      }
      tab.hide();
    });
    this.selectedTabTitle = tabTitle;
  }
  render() {
    return (index.h(index.Host, { ref: el => this.component = el }, index.h("div", { class: "tabTitles" }, this.tabTitles.map(tabTitle => index.h("button", { class: this.selectedTabTitle == tabTitle ? "visible" : "", onClick: () => this.showTab(tabTitle) }, tabTitle))), index.h("div", { class: "currentTab" }, index.h("slot", null))));
  }
};
DnnTabs.style = dnnTabsCss;

const dnnToggleCss = ":host{display:inline-block;outline:none;cursor:pointer}button{height:1.5em;width:2.5em;outline:none;background-color:var(--background, #888);border:0;border-radius:var(--border-radius, var(--dnn-controls-radius, 0.75em));padding:0.1em;position:relative;margin:0;-webkit-transition:background-color 300ms ease-in-out;transition:background-color 300ms ease-in-out;position:relative;cursor:pointer}button:hover,button:focus{-webkit-box-shadow:0 0 2px 2px var(--dnn-color-primary);box-shadow:0 0 2px 2px var(--dnn-color-primary)}button.checked{background-color:var(--background-checked, var(--dnn-color-primary, blue))}button.checked .handle{left:calc(1em + 4px)}button:disabled{opacity:0.5;cursor:not-allowed;-webkit-box-shadow:none;box-shadow:none}button .handle{-webkit-transition:all 300ms ease-in-out;transition:all 300ms ease-in-out;background-color:white;width:1em;height:1em;border-radius:var(--handle-border-radius, var(--dnn-controls-radius, 50%));position:absolute;top:calc(50% - 0.5em);left:2px}";

const DnnToggle = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.checkChanged = index.createEvent(this, "checkChanged", 7);
    /** If 'true' the toggle is checked (on). */
    this.checked = false;
    /** If 'true' the toggle is not be interacted with. */
    this.disabled = false;
  }
  checkedChanged(isChecked) {
    this.checkChanged.emit({ checked: isChecked });
  }
  render() {
    return (index.h(index.Host, null, index.h("button", { disabled: this.disabled, class: { 'checked': this.checked }, onClick: () => {
        if (!this.disabled) {
          this.checked = !this.checked;
        }
      } }, index.h("div", { class: "handle" }))));
  }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "checked": ["checkedChanged"]
  }; }
};
DnnToggle.style = dnnToggleCss;

const dnnTreeviewItemCss = ":host{display:-ms-flexbox;display:flex;overflow:visible}.expander{width:24px;height:24px}.expander button{-webkit-transition:all 150ms ease-in-out;transition:all 150ms ease-in-out;background-color:transparent;border:none;padding:0;margin:0;height:1em;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;cursor:pointer;position:relative;top:2px}.expander button svg :first-child{-webkit-transition:all 150ms ease-in-out;transition:all 150ms ease-in-out;fill:white;stroke:black}.expander.expanded button{-webkit-transform:rotate(45deg);transform:rotate(45deg)}.expander.expanded button svg :first-child{fill:black;stroke:black}div.item .item-slot{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:0.25em;min-height:24px}div.item div.children{overflow:hidden;height:0;-webkit-transition:all 150ms ease-in-out;transition:all 150ms ease-in-out}";

const DnnTreeviewItem = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.userExpanded = index.createEvent(this, "userExpanded", 3);
    this.userCollapsed = index.createEvent(this, "userCollapsed", 3);
    /** Defines if the current node is expanded.  */
    this.expanded = false;
    /** Manages state for whether or not item has children. */
    this.hasChildren = false;
  }
  /** Watch expanded Prop */
  watchExpanded(expanded) {
    if (expanded) {
      this.expander.classList.add("expanded");
      this.collapsible.expanded = true;
      return;
    }
    this.expander.classList.remove("expanded");
    this.collapsible.expanded = false;
  }
  componentDidLoad() {
    requestAnimationFrame(() => {
      const child = this.childElement.children[0];
      const count = child.assignedElements().length;
      if (count > 0) {
        this.hasChildren = true;
      }
      if (this.expanded) {
        this.expander.classList.add("expanded");
        this.collapsible.expanded = false;
        setTimeout(() => {
          this.collapsible.expanded = true;
        }, 300);
      }
    });
  }
  toggleCollapse() {
    this.expanded = !this.expanded;
    if (this.expanded) {
      this.expander.classList.add("expanded");
      this.userExpanded.emit();
      return;
    }
    this.expander.classList.remove("expanded");
    this.userCollapsed.emit();
  }
  render() {
    return (index.h(index.Host, null, index.h("div", { class: "expander", ref: el => this.expander = el }, this.hasChildren &&
      index.h("button", { onClick: () => this.toggleCollapse() }, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, index.h("path", { d: "M10 17l5-5-5-5v10z" }), index.h("path", { d: "M0 24V0h24v24H0z", fill: "none" })))), index.h("div", { class: "item" }, index.h("div", { class: "item-slot" }, index.h("slot", null)), index.h("dnn-collapsible", { ref: el => this.collapsible = el, expanded: this.expanded }, index.h("div", { ref: el => this.childElement = el }, index.h("slot", { name: "children" }))))));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "expanded": ["watchExpanded"]
  }; }
};
DnnTreeviewItem.style = dnnTreeviewItemCss;

const dnnVerticalOverflowMenuCss = ":host{--background-color:var(--dnn-color-primary-contrast, white);--foreground-color:var(--dnn-color-primary, #3792ED);display:block}.menu-container{display:-ms-flexbox;display:flex;-ms-flex-pack:start;justify-content:flex-start;-ms-flex-align:center;align-items:center;background-color:var(--background-color)}.menu-container .menu{margin:0.5em;display:-ms-flexbox;display:flex;gap:1em;-ms-flex-pack:start;justify-content:flex-start;-ms-flex-align:center;align-items:center;white-space:nowrap;width:100%}.menu-container .overflow{margin-left:auto;position:relative}.menu-container .overflow button{cursor:pointer;padding:0;margin:0;background-color:transparent;border:none}.menu-container .overflow button svg{fill:var(--foreground-color)}.menu-container .overflow .dropdown{position:absolute;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;white-space:nowrap;right:0;-webkit-transition:100ms ease-in-out;transition:100ms ease-in-out;height:0;overflow:hidden}.menu-container .overflow .dropdown.visible{padding:1em;gap:0.5em;background-color:var(--background-color);-webkit-box-shadow:2px 2px 4px rgba(0, 0, 0, 0.7);box-shadow:2px 2px 4px rgba(0, 0, 0, 0.7)}";

const DnnVerticalOverflowMenu = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.showDropdownButton = false;
    this.showDropdownMenu = false;
    this.previousMenuWidth = 0;
  }
  componentDidRender() {
    requestAnimationFrame(() => {
      this.moveItemsToDropDownIfNecessery();
      this.resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          if (entry.contentRect.width < this.previousMenuWidth) {
            this.moveItemsToDropDownIfNecessery();
          }
          if (this.previousMenuWidth > 0 && entry.contentRect.width > this.previousMenuWidth) {
            this.moveItemsToMenuIfPossible();
          }
          this.previousMenuWidth = entry.contentRect.width;
        }
      });
      this.resizeObserver.observe(this.element);
    });
  }
  moveItemsToDropDownIfNecessery() {
    const menuItems = Array.from(this.menu.querySelector("slot").assignedElements());
    const availableWidth = this.menu.getBoundingClientRect().width;
    let neededWidth = parseFloat(getComputedStyle(this.element).fontSize) * 2;
    menuItems.forEach(item => neededWidth += this.getFullWidth(item));
    neededWidth += (menuItems.length - 1) * parseFloat(getComputedStyle(this.element).fontSize);
    if (neededWidth > availableWidth) {
      this.showDropdownButton = true;
      var lastItem = menuItems[menuItems.length - 1];
      if (this.dropdown == undefined) {
        return;
      }
      lastItem.slot = "dropdown";
      this.moveItemsToDropDownIfNecessery();
    }
  }
  moveItemsToMenuIfPossible() {
    if (this.dropdown == undefined || !this.dropdown.hasChildNodes()) {
      return;
    }
    const menuItems = Array.from(this.menu.querySelector("slot").assignedElements());
    const availableWidth = this.menu.getBoundingClientRect().width;
    let neededWidth = parseFloat(getComputedStyle(this.element).fontSize) * 2;
    neededWidth += (menuItems.length - 1) * parseFloat(getComputedStyle(this.element).fontSize);
    menuItems.forEach(item => neededWidth += this.getFullWidth(item));
    const firstItem = this.dropdown.querySelector("slot").assignedElements()[0];
    if (firstItem != undefined) {
      neededWidth += this.getFullWidth(firstItem);
    }
    if (neededWidth < availableWidth) {
      if (firstItem != undefined) {
        firstItem.slot = "";
      }
      if (firstItem == undefined) {
        this.dropdown.classList.remove("visible");
        this.showDropdownMenu = false;
        this.showDropdownButton = false;
      }
    }
  }
  getFullWidth(item) {
    var width = item.getBoundingClientRect().width;
    var styles = getComputedStyle(item);
    width += parseFloat(styles.marginLeft);
    width += parseFloat(styles.marginRight);
    width += parseFloat(styles.paddingLeft);
    width += parseFloat(styles.paddingRight);
    return width;
  }
  toggleOverflowMenu() {
    this.showDropdownMenu = !this.showDropdownMenu;
    if (this.showDropdownMenu) {
      this.dropdown.classList.add("visible");
      let contentHeight = 0;
      const items = Array.from(this.dropdown.querySelector("slot").assignedElements());
      items.forEach(item => contentHeight += item.getBoundingClientRect().height);
      const emHeight = parseFloat(getComputedStyle(this.dropdown).fontSize);
      const gapsHeight = emHeight * (this.dropdown.children.length - 1) / 2;
      contentHeight += gapsHeight;
      const marginHeight = emHeight * 2;
      contentHeight += marginHeight;
      this.dropdown.style.height = `${contentHeight}px`;
      const dismissMenu = (e) => {
        const buttonRect = this.button.getBoundingClientRect();
        if (e.clientX < buttonRect.left ||
          e.clientX > buttonRect.right ||
          e.clientY < buttonRect.top ||
          e.clientY > buttonRect.bottom) {
          this.toggleOverflowMenu();
        }
        document.removeEventListener("click", dismissMenu);
      };
      setTimeout(() => {
        document.addEventListener("click", dismissMenu, false);
      }, 100);
    }
    else {
      this.dropdown.classList.remove("visible");
      this.dropdown.style.height = "0px";
    }
  }
  render() {
    return (index.h(index.Host, null, index.h("div", { class: "menu-container" }, index.h("div", { class: "menu", ref: el => this.menu = el }, index.h("slot", null)), this.showDropdownButton &&
      index.h("div", { class: "overflow" }, index.h("button", { ref: el => this.button = el, class: "icon", onClick: () => this.toggleOverflowMenu() }, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, index.h("path", { d: "M0 0h24v24H0z", fill: "none" }), index.h("path", { d: "M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" }))), index.h("div", { class: "dropdown", ref: el => this.dropdown = el }, index.h("slot", { name: "dropdown" }))))));
  }
  get element() { return index.getElement(this); }
};
DnnVerticalOverflowMenu.style = dnnVerticalOverflowMenuCss;

const dnnVerticalSplitviewCss = ":host{display:-ms-flexbox;display:flex;-ms-flex-align:stretch;align-items:stretch;margin:0 auto;position:relative;--left-pane-background-color:transparent;--right-pane-background-color:transparent}button{border:none;margin:0;padding:0;cursor:ew-resize;position:absolute;height:100%;background-color:transparent}button.transition{-webkit-transition:all 300ms ease-in-out;transition:all 300ms ease-in-out}.pane{overflow-y:auto}.pane.transition{-webkit-transition:all 300ms ease-in-out;transition:all 300ms ease-in-out}.pane.left{background-color:var(--left-pane-background-color)}.pane.right{background-color:var(--right-pane-background-color);-ms-flex-positive:1;flex-grow:1}";

const DnnVerticalSplitview = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.widthChanged = index.createEvent(this, "widthChanged", 7);
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
    return (index.h(index.Host, null, index.h("div", { class: "left pane", style: {
        width: `${this.leftWidth}px`,
      } }, index.h("slot", { name: "left" })), index.h("button", { onMouseDown: e => this.handleMouseDown(e), onTouchStart: e => this.handleMouseDown(e), onKeyDown: e => this.handleKeyDown(e), ref: el => this.splitter = el, style: {
        minWidth: `${this.splitterWidth.toString()}px`,
        left: `${this.leftWidth - 2}px`,
      } }, index.h("slot", null)), index.h("div", { class: "right pane", style: {
        width: `${this.rightWidth}px`,
      } }, index.h("slot", { name: "right" }))));
  }
  get element() { return index.getElement(this); }
};
DnnVerticalSplitview.style = dnnVerticalSplitviewCss;

exports.dnn_button = DnnButton;
exports.dnn_checkbox = DnnCheckbox;
exports.dnn_chevron = DnnChevron;
exports.dnn_collapsible = DnnCollapsible;
exports.dnn_color_picker = DnnColorPicker;
exports.dnn_dropzone = DnnDropzone;
exports.dnn_image_cropper = DnnImageCropper;
exports.dnn_modal = DnnModal;
exports.dnn_permissions_grid = DnnPermissionsGrid;
exports.dnn_searchbox = DnnSearchbox;
exports.dnn_sort_icon = DnnSortIcon;
exports.dnn_tab = DnnTab;
exports.dnn_tabs = DnnTabs;
exports.dnn_toggle = DnnToggle;
exports.dnn_treeview_item = DnnTreeviewItem;
exports.dnn_vertical_overflow_menu = DnnVerticalOverflowMenu;
exports.dnn_vertical_splitview = DnnVerticalSplitview;

//# sourceMappingURL=dnn-button_17.cjs.entry.js.map