import { B as BUILD, c as consoleDevInfo, p as plt, w as win, H, d as doc, N as NAMESPACE, a as promiseResolve, b as bootstrapLazy } from './index-b89da9ee.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

/*
 Stencil Client Patch Browser v2.18.0 | MIT Licensed | https://stenciljs.com
 */
const getDynamicImportFunction = (namespace) => `__sc_import_${namespace.replace(/\s|-/g, '_')}`;
const patchBrowser = () => {
    // NOTE!! This fn cannot use async/await!
    if (BUILD.isDev && !BUILD.isTesting) {
        consoleDevInfo('Running in development mode.');
    }
    if (BUILD.cssVarShim) {
        // shim css vars
        plt.$cssShim$ = win.__cssshim;
    }
    if (BUILD.cloneNodeFix) {
        // opted-in to polyfill cloneNode() for slot polyfilled components
        patchCloneNodeFix(H.prototype);
    }
    if (BUILD.profile && !performance.mark) {
        // not all browsers support performance.mark/measure (Safari 10)
        // because the mark/measure APIs are designed to write entries to a buffer in the browser that does not exist,
        // simply stub the implementations out.
        // TODO(STENCIL-323): Remove this patch when support for older browsers is removed (breaking)
        // @ts-ignore
        performance.mark = performance.measure = () => {
            /*noop*/
        };
        performance.getEntriesByName = () => [];
    }
    // @ts-ignore
    const scriptElm = BUILD.scriptDataOpts || BUILD.safari10 || BUILD.dynamicImportShim
        ? Array.from(doc.querySelectorAll('script')).find((s) => new RegExp(`\/${NAMESPACE}(\\.esm)?\\.js($|\\?|#)`).test(s.src) ||
            s.getAttribute('data-stencil-namespace') === NAMESPACE)
        : null;
    const importMeta = import.meta.url;
    const opts = BUILD.scriptDataOpts ? scriptElm['data-opts'] || {} : {};
    if (BUILD.safari10 && 'onbeforeload' in scriptElm && !history.scrollRestoration /* IS_ESM_BUILD */) {
        // Safari < v11 support: This IF is true if it's Safari below v11.
        // This fn cannot use async/await since Safari didn't support it until v11,
        // however, Safari 10 did support modules. Safari 10 also didn't support "nomodule",
        // so both the ESM file and nomodule file would get downloaded. Only Safari
        // has 'onbeforeload' in the script, and "history.scrollRestoration" was added
        // to Safari in v11. Return a noop then() so the async/await ESM code doesn't continue.
        // IS_ESM_BUILD is replaced at build time so this check doesn't happen in systemjs builds.
        return {
            then() {
                /* promise noop */
            },
        };
    }
    if (!BUILD.safari10 && importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    else if (BUILD.dynamicImportShim || BUILD.safari10) {
        opts.resourcesUrl = new URL('.', new URL(scriptElm.getAttribute('data-resources-url') || scriptElm.src, win.location.href)).href;
        if (BUILD.dynamicImportShim) {
            patchDynamicImport(opts.resourcesUrl, scriptElm);
        }
        if (BUILD.dynamicImportShim && !win.customElements) {
            // module support, but no custom elements support (Old Edge)
            // @ts-ignore
            return import(/* webpackChunkName: "polyfills-dom" */ './dom-104fb833.js').then(() => opts);
        }
    }
    return promiseResolve(opts);
};
const patchDynamicImport = (base, orgScriptElm) => {
    const importFunctionName = getDynamicImportFunction(NAMESPACE);
    try {
        // test if this browser supports dynamic imports
        // There is a caching issue in V8, that breaks using import() in Function
        // By generating a random string, we can workaround it
        // Check https://bugs.chromium.org/p/chromium/issues/detail?id=990810 for more info
        win[importFunctionName] = new Function('w', `return import(w);//${Math.random()}`);
    }
    catch (e) {
        // this shim is specifically for browsers that do support "esm" imports
        // however, they do NOT support "dynamic" imports
        // basically this code is for old Edge, v18 and below
        const moduleMap = new Map();
        win[importFunctionName] = (src) => {
            const url = new URL(src, base).href;
            let mod = moduleMap.get(url);
            if (!mod) {
                const script = doc.createElement('script');
                script.type = 'module';
                script.crossOrigin = orgScriptElm.crossOrigin;
                script.src = URL.createObjectURL(new Blob([`import * as m from '${url}'; window.${importFunctionName}.m = m;`], {
                    type: 'application/javascript',
                }));
                mod = new Promise((resolve) => {
                    script.onload = () => {
                        resolve(win[importFunctionName].m);
                        script.remove();
                    };
                });
                moduleMap.set(url, mod);
                doc.head.appendChild(script);
            }
            return mod;
        };
    }
};
const patchCloneNodeFix = (HTMLElementPrototype) => {
    const nativeCloneNodeFn = HTMLElementPrototype.cloneNode;
    HTMLElementPrototype.cloneNode = function (deep) {
        if (this.nodeName === 'TEMPLATE') {
            return nativeCloneNodeFn.call(this, deep);
        }
        const clonedNode = nativeCloneNodeFn.call(this, false);
        const srcChildNodes = this.childNodes;
        if (deep) {
            for (let i = 0; i < srcChildNodes.length; i++) {
                // Node.ATTRIBUTE_NODE === 2, and checking because IE11
                if (srcChildNodes[i].nodeType !== 2) {
                    clonedNode.appendChild(srcChildNodes[i].cloneNode(true));
                }
            }
        }
        return clonedNode;
    };
};

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy([["dnn-permissions-grid",[[1,"dnn-permissions-grid",{"permissions":[1040],"roleGroups":[16],"roles":[16],"resx":[16],"foundUsers":[16],"selectedRoleGroupId":[32],"userQuery":[32],"pickedUser":[32]}]]],["dnn-image-cropper",[[1,"dnn-image-cropper",{"width":[2],"height":[2],"resx":[16],"quality":[2],"preventUndersized":[4,"prevent-undersized"],"view":[32]}]]],["dnn-treeview-item",[[1,"dnn-treeview-item",{"expanded":[1540],"hasChildren":[32]}]]],["dnn-chevron",[[1,"dnn-chevron",{"expandText":[1,"expand-text"],"collapseText":[1,"collapse-text"],"expanded":[1540]}]]],["dnn-color-picker",[[1,"dnn-color-picker",{"color":[1],"colorBoxHeight":[1,"color-box-height"],"currentColor":[32],"rgbDisplay":[32],"hslDisplay":[32],"hexDisplay":[32]}]]],["dnn-sort-icon",[[1,"dnn-sort-icon",{"sortDirection":[1,"sort-direction"]}]]],["dnn-tab",[[1,"dnn-tab",{"tabTitle":[1,"tab-title"],"visible":[32],"show":[64],"hide":[64]}]]],["dnn-tabs",[[1,"dnn-tabs",{"tabTitles":[32],"selectedTabTitle":[32]}]]],["dnn-toggle",[[1,"dnn-toggle",{"checked":[1028],"disabled":[4]}]]],["dnn-vertical-overflow-menu",[[1,"dnn-vertical-overflow-menu",{"showDropdownButton":[32],"showDropdownMenu":[32]}]]],["dnn-vertical-splitview",[[1,"dnn-vertical-splitview",{"splitterWidth":[2,"splitter-width"],"splitWidthPercentage":[1026,"split-width-percentage"],"leftWidth":[32],"rightWidth":[32],"setSplitWidthPercentage":[64],"getSplitWidthPercentage":[64]}]]],["dnn-checkbox",[[1,"dnn-checkbox",{"checked":[1025],"useIntermediate":[4,"use-intermediate"],"value":[1]}]]],["dnn-dropzone",[[1,"dnn-dropzone",{"resx":[16],"allowedExtensions":[16],"allowCameraMode":[4,"allow-camera-mode"],"captureQuality":[2,"capture-quality"],"canTakeSnapshots":[32],"takingPicture":[32]}]]],["dnn-searchbox",[[1,"dnn-searchbox",{"placeholder":[1],"debounced":[4],"query":[1025]}]]],["dnn-modal",[[1,"dnn-modal",{"backdropDismiss":[4,"backdrop-dismiss"],"closeText":[1,"close-text"],"showCloseButton":[4,"show-close-button"],"visible":[1540],"show":[64],"hide":[64]}]]],["dnn-button",[[1,"dnn-button",{"type":[1],"reversed":[4],"size":[1],"confirm":[4],"confirmYesText":[1,"confirm-yes-text"],"confirmNoText":[1,"confirm-no-text"],"confirmMessage":[1,"confirm-message"],"disabled":[4],"modalVisible":[32]}]]],["dnn-collapsible",[[1,"dnn-collapsible",{"expanded":[516],"transitionDuration":[2,"transition-duration"],"updateSize":[64]},[[0,"dnnCollapsibleHeightChanged","handleHeightChanged"]]]]]], options);
});

//# sourceMappingURL=dnn.esm.js.map