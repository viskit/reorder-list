/******/ var __webpack_modules__ = ({

/***/ 904:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.COlXx8UKTV0_3NGOU_Kl > * {\n  transition: transform 0.5s;\n}\n\n.COlXx8UKTV0_3NGOU_Kl > .IjGW7Q_nqRxohNvJRV0T {\n  transition: unset;\n}\n", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"container": "COlXx8UKTV0_3NGOU_Kl",
	"draggable": "IjGW7Q_nqRxohNvJRV0T"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 645:
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ 379:
/***/ ((module) => {



var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 569:
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ 216:
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var style = document.createElement("style");
  options.setAttributes(style, options.attributes);
  options.insert(style);
  return style;
}

module.exports = insertStyleElement;

/***/ }),

/***/ 565:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(style) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    style.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 795:
/***/ ((module) => {



/* istanbul ignore next  */
function apply(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute("media", media);
  } else {
    style.removeAttribute("media");
  }

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, style);
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


function domAPI(options) {
  var style = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(style, options, obj);
    },
    remove: function remove() {
      removeStyleElement(style);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ 589:
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, style) {
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		id: moduleId,
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat get default export */
/******/ (() => {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		var getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "L": () => (/* binding */ ReorderList)
});

;// CONCATENATED MODULE: external "tslib"
const external_tslib_namespaceObject = require("tslib");
;// CONCATENATED MODULE: external "@viskit/reorder"
const reorder_namespaceObject = require("@viskit/reorder");
;// CONCATENATED MODULE: external "lit-element"
const external_lit_element_namespaceObject = require("lit-element");
;// CONCATENATED MODULE: external "rematrix"
const external_rematrix_namespaceObject = require("rematrix");
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(379);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(795);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(569);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(565);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(216);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(589);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!./src/css.css
var css = __webpack_require__(904);
;// CONCATENATED MODULE: ./src/css.css

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(css/* default */.Z, options);




       /* harmony default export */ const src_css = (css/* default */.Z && css/* default.locals */.Z.locals ? css/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ./src/index.ts





class ReorderList extends external_lit_element_namespaceObject.LitElement {
    constructor() {
        super();
        this.oldDraggableTransform = "";
        this.dragContainer = null;
        this.oldTransformMap = new Map();
        this.containerSelector = "";
        this.draggableClass = "";
        this.onStart = this.onStart.bind(this);
        this.onDrag = this.onDrag.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }
    createRenderRoot() {
        return this;
    }
    reorderMove({ detail: { el, container, reorder, hoverContainer, hoverEl, hoverIndex }, }) {
        if (hoverEl) {
            if (container === hoverContainer) {
                const { itemDataMap } = reorder.dataCacheMap.get(container);
                const { rect: { height }, index: elIndex, } = itemDataMap.get(el);
                if (hoverEl) {
                }
                const { index: hoverElIndex } = itemDataMap.get(hoverEl);
                const items = Array.from(container.children);
                for (let i = 0, len = items.length; i < len; i++) {
                    const item = items[i];
                    let oldTransform = "";
                    if (this.oldTransformMap.has(item)) {
                        oldTransform = this.oldTransformMap.get(item);
                    }
                    else {
                        oldTransform = item.style.transform;
                        this.oldTransformMap.set(item, oldTransform);
                    }
                    if (item === el)
                        continue;
                    const style = item.style;
                    let transform = external_rematrix_namespaceObject.fromString(oldTransform);
                    if (i > elIndex && i <= hoverElIndex) {
                        style.transform = external_rematrix_namespaceObject.toString([transform, external_rematrix_namespaceObject.translateY(-height)].reduce(external_rematrix_namespaceObject.multiply));
                    }
                    else if (i < elIndex && i >= hoverElIndex) {
                        style.transform = external_rematrix_namespaceObject.toString([transform, external_rematrix_namespaceObject.translateY(height)].reduce(external_rematrix_namespaceObject.multiply));
                    }
                    else {
                        style.transform = oldTransform;
                    }
                }
            }
        }
    }
    firstUpdated() {
        this.reorder.addEventListener("onStart", this.onStart);
        this.reorder.addEventListener("onDrag", this.onDrag);
        this.reorder.addEventListener("onDrop", this.onDrop);
    }
    disconnectedCallback() {
        this.reorder.removeEventListener("onStart", this.onStart);
        this.reorder.removeEventListener("onDrag", this.onDrag);
        this.reorder.removeEventListener("onDrop", this.onDrop);
    }
    onStart({ detail: { container, el, gestureDetail, reorder } }) {
        this.dragContainer = container;
        if (this.draggableClass) {
            el.classList.add(this.draggableClass);
        }
        this.oldDraggableTransform = el.style.transform;
        this.oldTransformMap = new Map();
    }
    onDrag(event) {
        const { detail: { el, container, hoverContainer, hoverEl, hoverIndex, reorder, gestureDetail: { deltaY }, }, } = event;
        // drag el
        let transform = external_rematrix_namespaceObject.fromString(this.oldDraggableTransform);
        el.classList.add(src_css.draggable);
        el.style.transform = external_rematrix_namespaceObject.toString([transform, external_rematrix_namespaceObject.translateY(deltaY)].reduce(external_rematrix_namespaceObject.multiply));
        if (this.hoverIndex !== hoverIndex) {
            this.hoverIndex = hoverIndex;
            this.reorderMove(event);
        }
    }
    onDrop({ detail: { el, complete } }) {
        if (this.draggableClass) {
            el.classList.remove(this.draggableClass);
        }
        el.style.transform = this.oldDraggableTransform;
        for (let [itemEl, transform] of this.oldTransformMap) {
            itemEl.style.transform = transform;
        }
    }
    updated(map) {
        return (0,external_tslib_namespaceObject.__awaiter)(this, void 0, void 0, function* () {
            if (map.has("containerSelector")) {
                this.reorder.containerSelectors = this.containerSelector
                    ? [this.containerSelector]
                    : null;
                yield this.reorder.updateComplete;
                for (let container of this.reorder.containers) {
                    container.classList.add(src_css.container);
                }
            }
        });
    }
}
(0,external_tslib_namespaceObject.__decorate)([
    (0,external_lit_element_namespaceObject.query)("viskit-reorder")
], ReorderList.prototype, "reorder", void 0);
(0,external_tslib_namespaceObject.__decorate)([
    (0,external_lit_element_namespaceObject.property)({ type: String })
], ReorderList.prototype, "containerSelector", void 0);
(0,external_tslib_namespaceObject.__decorate)([
    (0,external_lit_element_namespaceObject.property)({ type: String })
], ReorderList.prototype, "draggableClass", void 0);
window.customElements.define("viskit-reorder-list", ReorderList);

})();

var __webpack_exports__ReorderList = __webpack_exports__.L;
export { __webpack_exports__ReorderList as ReorderList };
