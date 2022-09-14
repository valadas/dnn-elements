import { r as registerInstance, h, f as Host } from './index-b89da9ee.js';

const dnnTabsCss = ":host{display:block;--color-background:var(--dnn-color-secondary-dark, lightgray);--color-text:var(--dnn-color-secondary-contrast, #333);--color-visible:var(--dnn-color-primary, #3792ED);--color-visible-text:var(--dnn-color-primary-contrast, #FFF);--color-focus:var(--dnn-color-primary, #3792ed)}.tabTitles{display:flex;background-color:var(--color-background);color:var(--color-text)}.tabTitles button{padding:0.5rem 1rem;border:0;margin:0;background-color:transparent}.tabTitles button.visible{background-color:var(--color-visible);color:var(--color-bisible-text)}.tabTitles button:focus,.tabTitles button:hover{outline:none;box-shadow:0 0 2px 2px var(--color-focus)}.currentTab{border:1px solid var(--color-background)}";

const DnnTabs = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    return (h(Host, { ref: el => this.component = el }, h("div", { class: "tabTitles" }, this.tabTitles.map(tabTitle => h("button", { class: this.selectedTabTitle == tabTitle ? "visible" : "", onClick: () => this.showTab(tabTitle) }, tabTitle))), h("div", { class: "currentTab" }, h("slot", null))));
  }
};
DnnTabs.style = dnnTabsCss;

export { DnnTabs as dnn_tabs };

//# sourceMappingURL=dnn-tabs.entry.js.map