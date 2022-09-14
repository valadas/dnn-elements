import { r as registerInstance, e as createEvent, h, g as getElement } from './index-b89da9ee.js';
import { D as Debounce } from './debounce-06f55268.js';

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

const dnnColorPickerCss = ".dnn-color-picker{padding:15px;max-width:400px}.dnn-color-picker .dnn-color-sliders{display:flex;flex-direction:column;min-width:200px}.dnn-color-picker .dnn-color-sliders .dnn-color-s-b{border:1px solid #ccc;padding-bottom:var(--color-box-height, 50%);position:relative;background-color:red}.dnn-color-picker .dnn-color-sliders .dnn-color-s-b:before{content:\"\";position:absolute;top:0;left:0;width:100%;height:100%;z-index:1;background:linear-gradient(to right, white, red);mix-blend-mode:saturation}.dnn-color-picker .dnn-color-sliders .dnn-color-s-b:after{content:\"\";position:absolute;top:0;left:0;width:100%;height:100%;z-index:2;background:linear-gradient(to bottom, white, black);mix-blend-mode:luminosity}.dnn-color-picker .dnn-color-sliders .dnn-color-s-b button{position:absolute;bottom:calc(50% - 4px);left:calc(50% - 4px);width:8px;height:8px;z-index:3;display:block;background:none;border:none;margin-left:-4px;margin-bottom:-4px;padding:7px;background-color:#fff;border-radius:50%}.dnn-color-picker .dnn-color-sliders .dnn-color-s-b button:before{content:\"\";position:absolute;top:-1px;left:-1px;border-radius:50%}.dnn-color-picker .dnn-color-sliders .dnn-color-s-b button:after{content:\"\";position:absolute;top:0px;left:0px;border-radius:50%;width:10px;height:10px;border:2px solid #ccc}.dnn-color-picker .dnn-color-sliders .dnn-color-bar{display:flex;align-items:center;margin-top:15px}.dnn-color-picker .dnn-color-sliders .dnn-color-bar .dnn-color-result{flex-direction:column;width:50px;height:50px;border-radius:50%;background:red}.dnn-color-picker .dnn-color-sliders .dnn-color-bar .dnn-color-hue{flex:auto;margin-left:10px;height:16px;border:1px solid #ccc;position:relative;background:linear-gradient(to right, #f00 0, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 84%, #f00 100%)}.dnn-color-picker .dnn-color-sliders .dnn-color-bar .dnn-color-hue button{width:10px;height:20px;position:absolute;top:-2px;left:calc(50% - 4px);border:0;padding:0;background-color:transparent;padding-left:-8px}.dnn-color-picker .dnn-color-sliders .dnn-color-bar .dnn-color-hue button:before{content:\"\";position:absolute;top:-2px;left:0px;border-radius:3px;width:100%;height:100%;border:1px solid #ccc;background-color:#fff}.dnn-color-picker .dnn-color-fields{display:flex;flex-direction:column;justify-content:space-between}.dnn-color-picker .dnn-color-fields .dnn-color-mode-switch{display:flex;align-items:flex-end;padding:0.5em}.dnn-color-picker .dnn-color-fields .dnn-color-mode-switch button{background-color:transparent;border:none}.dnn-color-picker .dnn-color-fields .dnn-color-mode-switch button svg{width:3em;height:3em;pointer-events:none;outline:none}.dnn-color-picker .dnn-color-fields .dnn-rgb-color-fields{display:flex;justify-content:space-evenly}.dnn-color-picker .dnn-color-fields .dnn-rgb-color-fields .dnn-rgb-color-field{display:flex;flex-direction:column;flex:auto;text-align:center;padding:0.5em}.dnn-color-picker .dnn-color-fields .dnn-rgb-color-fields .dnn-rgb-color-field label{padding-bottom:0.25em}.dnn-color-picker .dnn-color-fields .dnn-rgb-color-fields .dnn-rgb-color-field input{border-radius:var(--dnn-button-radius, 3px);border:1px solid #ccc;padding:0.5em;padding-left:1.3em;text-align:center}.dnn-color-picker .dnn-color-fields .dnn-rgb-color-fields .dnn-rgb-color-field input.red{border-color:red}.dnn-color-picker .dnn-color-fields .dnn-rgb-color-fields .dnn-rgb-color-field input.green{border-color:green}.dnn-color-picker .dnn-color-fields .dnn-rgb-color-fields .dnn-rgb-color-field input.blue{border-color:blue}.dnn-color-picker .dnn-color-fields .dnn-hsl-color-fields{display:flex;justify-content:space-evenly}.dnn-color-picker .dnn-color-fields .dnn-hsl-color-fields .dnn-hsl-color-field{display:flex;flex-direction:column;flex:auto;text-align:center;padding:0.5em}.dnn-color-picker .dnn-color-fields .dnn-hsl-color-fields .dnn-hsl-color-field label{padding-bottom:0.25em}.dnn-color-picker .dnn-color-fields .dnn-hsl-color-fields .dnn-hsl-color-field input{border-radius:var(--dnn-button-radius, 3px);border:1px solid #ccc;padding:0.5em;padding-left:1.3em;text-align:center}.dnn-color-picker .dnn-color-fields .dnn-hex-color-fields{display:flex;justify-content:space-evenly}.dnn-color-picker .dnn-color-fields .dnn-hex-color-fields .dnn-hex-color-field{display:flex;flex-direction:column;flex:auto;text-align:center;padding:0.5em}.dnn-color-picker .dnn-color-fields .dnn-hex-color-fields .dnn-hex-color-field label{padding-bottom:0.25em}.dnn-color-picker .dnn-color-fields .dnn-hex-color-fields .dnn-hex-color-field .hex-input{position:relative;border-radius:var(--dnn-button-radius, 3px);border:1px solid #ccc;padding:0.323em;text-align:center}.dnn-color-picker .dnn-color-fields .dnn-hex-color-fields .dnn-hex-color-field .hex-input input{border:0;padding:0;margin:0;width:100%;height:100%;text-align:center}.dnn-color-picker .dnn-color-fields .dnn-hex-color-fields .dnn-hex-color-field .hex-input button{position:absolute;height:100%;top:0;right:1em;background-color:transparent;border:0;padding:0;margin:0}.dnn-color-picker .dnn-color-fields .dnn-hex-color-fields .dnn-hex-color-field .hex-input button svg{min-width:1em}";

/** Reusable DNN UI component to pick a color
 * @copyright Copyright (c) .NET Foundation. All rights reserved.
 * @license MIT
 */
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
const DnnColorPicker = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.colorChanged = createEvent(this, "colorChanged", 7);
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
        default:
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
          default:
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
        default:
          break;
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
        default:
          break;
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
    return (h("div", { class: "dnn-color-picker" }, h("div", { class: "dnn-color-sliders" }, h("div", { class: "dnn-color-s-b", ref: (element) => this.saturationLightnessBox = element, style: { backgroundColor: `hsl(${hue},100%,50%)` }, onMouseDown: this.handleSaturationLightnessMouseDown.bind(this) }, h("button", { class: "dnn-s-b-picker", "aria-label": "Press up or down to adjust lightness, left or right to adjust saturation, hold shift to move by 10%", role: "slider", "aria-valuemin": "0", "aria-valuemax": "100", "aria-valuetext": `Saturation: ${Math.round(this.currentColor.saturation * 100)}%, Lightness: ${Math.round(this.currentColor.lightness * 100)}%`, style: {
        left: Math.round(saturation * 100) + "%",
        bottom: Math.round(lightness * 100) + "%"
      }, onKeyDown: (e) => this.handleSaturationLightnessKeyDown(e) })), h("div", { class: "dnn-color-bar" }, h("div", { class: "dnn-color-result", style: {
        backgroundColor: '#' + this.getHex(),
        boxShadow: "0 0 2px 1px " + "#" + this.getContrast()
      } }), h("div", { class: "dnn-color-hue", ref: (element) => this.hueRange = element, onMouseDown: this.handleHueMouseDown.bind(this) }, h("button", { class: "dnn-hue-picker", "aria-label": "Press left or right to adjust hue, hold shift to move by 10 degrees", role: "slider", "aria-valuemin": "0", "aria-valuemax": "359", "aria-valuenow": Math.round(hue), style: { left: (hue / 359 * 100).toString() + "%" }, onKeyDown: (e) => this.handleHueKeyDown(e) })))), h("div", { class: "dnn-color-fields" }, h("div", { class: "dnn-rgb-color-fields", style: { display: this.rgbDisplay } }, h("div", { class: "dnn-rgb-color-field" }, h("label", null, "R"), h("input", { type: "number", min: "0", max: "255", step: "1", class: "red", value: red, "aria-label": "red value", onChange: (e) => this.handleComponentValueChange(e, 'red') })), h("div", { class: "dnn-rgb-color-field" }, h("label", null, "G"), h("input", { type: "number", min: "0", max: "255", class: "green", value: green, "aria-label": "green value", onChange: (e) => this.handleComponentValueChange(e, 'green') })), h("div", { class: "dnn-rgb-color-field" }, h("label", null, "B"), h("input", { type: "number", min: "0", max: "255", class: "blue", value: blue, "aria-label": "blue value", onChange: (e) => this.handleComponentValueChange(e, 'blue') })), h("div", { class: "dnn-color-mode-switch" }, h("button", { id: "rgb-switch", onClick: this.switchColorMode.bind(this), "aria-label": "switch to hexadecimal value entry" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, h("path", { d: "M0 0h24v24H0z", fill: "none" }), h("path", { d: "M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" }))))), h("div", { class: "dnn-hsl-color-fields", style: { display: this.hslDisplay } }, h("div", { class: "dnn-hsl-color-field" }, h("label", null, "H"), h("input", { type: "number", min: "0", max: "359", step: 1, value: Math.round(hue), "aria-label": "Hue", onChange: (e) => this.handleHSLChange(e, 'hue') })), h("div", { class: "dnn-hsl-color-field" }, h("label", null, "S"), h("input", { type: "number", min: "0", max: "100", step: 1, value: Math.round(saturation * 100), "aria-label": "Saturation", onChange: (e) => this.handleHSLChange(e, 'saturation') })), h("div", { class: "dnn-hsl-color-field" }, h("label", null, "L"), h("input", { type: "number", min: "0", max: "100", step: 1, value: Math.round(lightness * 100), "aria-label": "Lightness", onChange: (e) => this.handleHSLChange(e, 'lightness') })), h("div", { class: "dnn-color-mode-switch" }, h("button", { id: "hsl-switch", onClick: this.switchColorMode.bind(this), "aria-label": "Switch to red, green, blue entry mode" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, h("path", { d: "M0 0h24v24H0z", fill: "none" }), h("path", { d: "M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" }))))), h("div", { class: "dnn-hex-color-fields", style: { display: this.hexDisplay } }, h("div", { class: "dnn-hex-color-field" }, h("label", null, "HEX"), h("div", { class: "hex-input" }, h("input", { type: "text", "aria-label": "Hexadecimal value", value: this.getHex(), onChange: e => this.handleHexChange(e.target.value) }), h("button", { class: "copy", "aria-label": "copy value" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, h("path", { d: "M0 0h24v24H0z", fill: "none" }), h("path", { d: "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" }))))), h("div", { class: "dnn-color-mode-switch" }, h("button", { id: "hex-switch", onClick: this.switchColorMode.bind(this), "aria-label": "Switch to hue saturation lightness values" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" }, h("path", { d: "M0 0h24v24H0z", fill: "none" }), h("path", { d: "M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" }))))))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "currentColor": ["handeCurrentColorChanged"]
  }; }
};
__decorate([
  Debounce(100)
], DnnColorPicker.prototype, "colorChangedHandler", null);
DnnColorPicker.style = dnnColorPickerCss;

export { DnnColorPicker as dnn_color_picker };

//# sourceMappingURL=dnn-color-picker.entry.js.map