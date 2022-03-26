import { Component, Host, h, Prop, Event } from '@stencil/core';
import { Watch } from '@stencil/core';
export class DnnChevron {
  constructor() {
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
    return (h(Host, null,
      h("button", { "aria-label": this.expanded ? this.collapseText : this.expandText, onClick: () => this.expanded = !this.expanded },
        h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" },
          h("path", { d: "M0 0h24v24H0z", fill: "none" }),
          h("path", { d: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" })))));
  }
  static get is() { return "dnn-chevron"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["dnn-chevron.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["dnn-chevron.css"]
  }; }
  static get properties() { return {
    "expandText": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "Expand text for screen readers"
      },
      "attribute": "expand-text",
      "reflect": false,
      "defaultValue": "\"expand\""
    },
    "collapseText": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "Collapse text for screen readers"
      },
      "attribute": "collapse-text",
      "reflect": false,
      "defaultValue": "\"collapse\""
    },
    "expanded": {
      "type": "boolean",
      "mutable": true,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "Is the chevron expanded"
      },
      "attribute": "expanded",
      "reflect": true,
      "defaultValue": "false"
    }
  }; }
  static get events() { return [{
      "method": "changed",
      "name": "changed",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Fires up when the expanded status changes"
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }]; }
  static get watchers() { return [{
      "propName": "expanded",
      "methodName": "handleExpandedChanged"
    }]; }
}
//# sourceMappingURL=dnn-chevron.js.map