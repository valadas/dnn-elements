'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-514ef6dd.js');

/*
 Stencil Client Patch Esm v2.14.2 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return index.bootstrapLazy([["dnn-button_17.cjs",[[1,"dnn-permissions-grid",{"permissions":[1040],"roleGroups":[16],"roles":[16],"resx":[16],"foundUsers":[16],"selectedRoleGroupId":[32],"userQuery":[32],"pickedUser":[32]}],[1,"dnn-image-cropper",{"width":[2],"height":[2],"resx":[16],"quality":[2],"preventUndersized":[4,"prevent-undersized"],"view":[32]}],[1,"dnn-treeview-item",{"expanded":[1540],"hasChildren":[32]}],[1,"dnn-chevron",{"expandText":[1,"expand-text"],"collapseText":[1,"collapse-text"],"expanded":[1540]}],[1,"dnn-color-picker",{"color":[1],"colorBoxHeight":[1,"color-box-height"],"currentColor":[32],"rgbDisplay":[32],"hslDisplay":[32],"hexDisplay":[32]}],[1,"dnn-sort-icon",{"sortDirection":[1,"sort-direction"]}],[1,"dnn-tab",{"tabTitle":[1,"tab-title"],"visible":[32],"show":[64],"hide":[64]}],[1,"dnn-tabs",{"tabTitles":[32],"selectedTabTitle":[32]}],[1,"dnn-toggle",{"checked":[1028],"disabled":[4]}],[1,"dnn-vertical-overflow-menu",{"showDropdownButton":[32],"showDropdownMenu":[32]}],[1,"dnn-vertical-splitview",{"splitterWidth":[2,"splitter-width"],"splitWidthPercentage":[1026,"split-width-percentage"],"leftWidth":[32],"rightWidth":[32],"setSplitWidthPercentage":[64],"getSplitWidthPercentage":[64]}],[1,"dnn-checkbox",{"checked":[1025],"useIntermediate":[4,"use-intermediate"],"value":[1]}],[1,"dnn-dropzone",{"resx":[16],"allowedExtensions":[16],"allowCameraMode":[4,"allow-camera-mode"],"captureQuality":[2,"capture-quality"],"canTakeSnapshots":[32],"takingPicture":[32]}],[1,"dnn-searchbox",{"placeholder":[1],"debounced":[4],"query":[1025]}],[1,"dnn-button",{"type":[1],"reversed":[4],"size":[1],"confirm":[4],"confirmYesText":[1,"confirm-yes-text"],"confirmNoText":[1,"confirm-no-text"],"confirmMessage":[1,"confirm-message"],"disabled":[4],"modalVisible":[32]}],[1,"dnn-collapsible",{"expanded":[516],"transitionDuration":[2,"transition-duration"],"updateSize":[64]},[[0,"dnnCollapsibleHeightChanged","handleHeightChanged"]]],[1,"dnn-modal",{"backdropDismiss":[4,"backdrop-dismiss"],"closeText":[1,"close-text"],"showCloseButton":[4,"show-close-button"],"visible":[1540],"show":[64],"hide":[64]}]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;

//# sourceMappingURL=loader.cjs.js.map