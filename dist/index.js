/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
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

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "L": () => (/* binding */ ReorderList)
});

;// CONCATENATED MODULE: external "tslib"
const external_tslib_namespaceObject = require("tslib");
;// CONCATENATED MODULE: external "@viskit/reorder"
const reorder_namespaceObject = require("@viskit/reorder");
;// CONCATENATED MODULE: external "lit"
const external_lit_namespaceObject = require("lit");
;// CONCATENATED MODULE: external "lit/decorators.js"
const decorators_js_namespaceObject = require("lit/decorators.js");
;// CONCATENATED MODULE: external "@viskit/long-press"
const long_press_namespaceObject = require("@viskit/long-press");
;// CONCATENATED MODULE: ./src/index.ts





const clear = (children, deep = false) => {
    const childrens = Array.from(children);
    childrens.forEach((c) => {
        c.style.transform = "";
        deep && (c.style.transition = "");
    });
};
class ReorderList extends external_lit_namespaceObject.LitElement {
    constructor() {
        super(...arguments);
        this.enable = false;
        this.inEnable = false;
        this.containerSelector = "";
        this.containers = [this];
    }
    firstUpdated() {
        (0,long_press_namespaceObject.register)(this.shadowRoot);
        this.addEventListener("long-press", (e) => {
            const draggable = this.selectedDragEl;
            if (draggable) {
                this.inEnable = true;
                const dragEl = draggable.cloneNode(true);
                const styles = window.getComputedStyle(draggable);
                for (let i = 0, len = styles.length; i < len; i++) {
                    const key = styles.item(i);
                    dragEl.style.setProperty(key, styles.getPropertyValue(key));
                }
                const { left, top, width, height } = draggable.getBoundingClientRect();
                dragEl.style.position = "absolute";
                dragEl.style.top = top + "px";
                dragEl.style.left = left + "px";
                dragEl.style.pointerEvents = "none";
                dragEl.style.margin = "0";
                dragEl.style.width = width + "px";
                dragEl.style.height = height + "px";
                dragEl.style.transition = "";
                dragEl.style.boxShadow = "5px 5px 5px #333";
                document.body.appendChild(dragEl);
                this.dragEl = dragEl;
                draggable.style.opacity = "0";
            }
        }, true);
    }
    render() {
        return external_lit_namespaceObject.html `
      <viskit-reorder
        .enable=${this.enable && this.inEnable}
        .canStart=${(e) => {
            this.selectedDragEl = e.data.draggable;
        }}
        @viskit-start=${() => {
            this.dispatchEvent(new CustomEvent("viskit-start"));
        }}
        @viskit-drag=${this.onDrag}
        @viskit-reorder=${this.onReorder}
        @viskit-drop=${this.onDrop}
        @viskit-end=${this.onEnd}
        @pointerup=${this.onEnd}
        .containers=${this.containers}
      >
        <slot></slot>
      </viskit-reorder>
    `;
    }
    updated(map) {
        return (0,external_tslib_namespaceObject.__awaiter)(this, void 0, void 0, function* () {
            if (map.has("containerSelector") && this.containerSelector) {
                this.containers = Array.from(this.querySelectorAll(this.containerSelector));
            }
            if (map.has("containers")) {
                this.containers.forEach((c) => this.addStyle(c));
            }
        });
    }
    addStyle(container) {
        Array.from(container.children).forEach((el) => {
            el.style.transition = "transform .2s";
        });
    }
    onEnd(ev) {
        if (this.inEnable) {
            this.inEnable = false;
        }
        const data = ev.data;
        if (data) {
            data.hoverContainer && clear(data.hoverContainer.children);
            data.container && clear(data.container.children, true);
            this.dispatchEvent(new CustomEvent("viskit-end"));
        }
        this.selectedDragEl &&
            this.selectedDragEl.style.setProperty("opacity", "unset");
        this.dragEl && this.dragEl.remove();
    }
    onDrag({ data, deltaY, container }) {
        this.dragEl.style.transform = `translateY(${deltaY}px)`;
    }
    onReorder({ data, y, container, hoverIndex, hoverable, hoverContainer, draggable, draggableIndex, draggableRect, hoverableRect, }) {
        const prevHoverContainer = data.hoverContainer;
        // clear prev
        let index = hoverIndex;
        // clear previous cntainer's children transform
        if (prevHoverContainer !== hoverContainer && prevHoverContainer) {
            clear(prevHoverContainer.children);
        }
        if (container === hoverContainer) {
            if (hoverIndex === draggableIndex) {
                clear(hoverContainer.children);
            }
            else if (hoverIndex < draggableIndex) {
                if (y > hoverableRect.top + hoverableRect.height / 2) {
                    ++index;
                    data.after = true;
                }
                else {
                    data.after = false;
                }
                if (index === draggableIndex) {
                    clear(hoverContainer.children);
                }
                else {
                    const children = Array.from(hoverContainer.children);
                    this.addStyle(hoverContainer);
                    for (let i = 0, len = children.length; i < len; i++) {
                        let y = 0;
                        if (i >= index && i < draggableIndex) {
                            y = draggableRect.height;
                        }
                        children[i].style.transform = `translateY(${y}px)`;
                    }
                }
            }
            else {
                if (y < hoverableRect.top + hoverableRect.height / 2) {
                    --index;
                    data.after = false;
                }
                else {
                    data.after = true;
                }
                if (index === draggableIndex) {
                    clear(hoverContainer.children);
                }
                else {
                    const children = Array.from(hoverContainer.children);
                    this.addStyle(hoverContainer);
                    for (let i = 0, len = children.length; i < len; i++) {
                        let y = 0;
                        if (i > draggableIndex && i <= index) {
                            y = -draggableRect.height;
                        }
                        children[i].style.transform = `translateY(${y}px)`;
                    }
                }
            }
        }
        else {
            const fromTop = draggableRect.top < hoverableRect.top;
            if (y > hoverableRect.top + hoverableRect.height / 2) {
                ++index;
                data.after = true;
            }
            else {
                data.after = false;
            }
            const children = Array.from(hoverContainer.children);
            for (let i = 0, len = children.length; i < len; i++) {
                let y = 0;
                if (index === children.length) {
                    y = -draggableRect.height;
                }
                else {
                    if (i >= index) {
                        y = draggableRect.height;
                    }
                }
                this.addStyle(hoverContainer);
                if ((fromTop && hoverIndex === 0 && !data.after) ||
                    (!fromTop &&
                        hoverIndex === hoverContainer.children.length - 1 &&
                        data.after)) {
                    y = y / 2;
                }
                children[i].style.transform = `translateY(${y}px)`;
            }
        }
        data.hoverContainer = hoverContainer;
        data.dropIndex = index;
    }
    onDrop({ data, complete }) {
        if (data.draggable !== data.hoverable) {
            complete(data.after);
        }
    }
}
ReorderList.styles = external_lit_namespaceObject.css `
    :host {
      display: block;
    }
  `;
(0,external_tslib_namespaceObject.__decorate)([
    (0,decorators_js_namespaceObject.property)({ type: Boolean })
], ReorderList.prototype, "enable", void 0);
(0,external_tslib_namespaceObject.__decorate)([
    (0,decorators_js_namespaceObject.state)()
], ReorderList.prototype, "inEnable", void 0);
(0,external_tslib_namespaceObject.__decorate)([
    (0,decorators_js_namespaceObject.query)("viskit-reorder")
], ReorderList.prototype, "reorder", void 0);
(0,external_tslib_namespaceObject.__decorate)([
    (0,decorators_js_namespaceObject.query)("div")
], ReorderList.prototype, "div", void 0);
(0,external_tslib_namespaceObject.__decorate)([
    (0,decorators_js_namespaceObject.property)()
], ReorderList.prototype, "containerSelector", void 0);
(0,external_tslib_namespaceObject.__decorate)([
    (0,decorators_js_namespaceObject.property)({
        attribute: false,
        hasChanged(containers) {
            return Array.isArray(containers) && containers.every(c => c instanceof HTMLElement);
        }
    })
], ReorderList.prototype, "containers", void 0);
window.customElements.define("viskit-reorder-list", ReorderList);

var __webpack_exports__ReorderList = __webpack_exports__.L;
export { __webpack_exports__ReorderList as ReorderList };
