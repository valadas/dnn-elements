import { Component, Host, h, State } from "@stencil/core";
export class DnnTabs {
  constructor() {
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
    return (h(Host, { ref: el => this.component = el },
      h("div", { class: "tabTitles" }, this.tabTitles.map(tabTitle => h("button", { class: this.selectedTabTitle == tabTitle ? "visible" : "", onClick: () => this.showTab(tabTitle) }, tabTitle))),
      h("div", { class: "currentTab" },
        h("slot", null))));
  }
  static get is() { return "dnn-tabs"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["dnn-tabs.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["dnn-tabs.css"]
  }; }
  static get states() { return {
    "tabTitles": {},
    "selectedTabTitle": {}
  }; }
}
//# sourceMappingURL=dnn-tabs.js.map