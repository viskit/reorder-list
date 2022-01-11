import "@viskit/reorder";
import {html as $f3Ts0$html, LitElement as $f3Ts0$LitElement, css as $f3Ts0$css} from "lit";
import {property as $f3Ts0$property, state as $f3Ts0$state, query as $f3Ts0$query} from "lit/decorators.js";
import {register as $f3Ts0$register} from "@viskit/long-press";

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $113d663bca6ee001$exports = {};

$parcel$export($113d663bca6ee001$exports, "ReorderList", () => $113d663bca6ee001$export$f40fc8d0c925c16f, (v) => $113d663bca6ee001$export$f40fc8d0c925c16f = v);



/**
 *
 * From https://gist.github.com/developit/45c85e9be01e8c3f1a0ec073d600d01e
 *
 * cloneNode(true), but also clones shadow roots.
 * @param {Element}
 * @param {ShadowRoot[]} [shadowRoots] Any closed shadow roots passed here will be included.
 */ function $07a60613137be1e0$export$bed73f3f6cfdbb7d(node1, shadowRoots = []) {
    function walk(node, clone) {
        let shadow = node.shadowRoot || shadowRoots.find((r)=>r.host === node
        );
        if (shadow) {
            const cloneShadow = clone.shadowRoot || clone.attachShadow({
                mode: shadow.mode
            });
            cloneShadow.append(...[].map.call(shadow.childNodes, (c)=>c.cloneNode(true)
            ));
        }
        for(let i = 0; i < node.children.length; i++)walk(node.children[i], clone.children[i]);
    }
    const clone1 = node1.cloneNode(true);
    walk(node1, clone1);
    return clone1;
}



var $113d663bca6ee001$var$__decorate = undefined && undefined.__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $113d663bca6ee001$var$__awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const $113d663bca6ee001$var$clear = (children, deep = false)=>{
    const childrens = Array.from(children);
    childrens.forEach((c)=>{
        c.style.transform = "";
        deep && (c.style.transition = "");
    });
};
class $113d663bca6ee001$export$f40fc8d0c925c16f extends $f3Ts0$LitElement {
    constructor(){
        super(...arguments);
        this.enable = false;
        this.inEnable = false;
        this.containerSelector = "";
        this.containers = [
            this
        ];
    }
    firstUpdated() {
        $f3Ts0$register(this.shadowRoot);
        this.addEventListener("long-press", (e)=>{
            const draggable = this.selectedDragEl;
            if (draggable) {
                this.inEnable = true;
                const dragEl = $07a60613137be1e0$export$bed73f3f6cfdbb7d(draggable);
                const styles = window.getComputedStyle(draggable);
                for(let i = 0, len = styles.length; i < len; i++){
                    const key = styles.item(i);
                    dragEl.style.setProperty(key, styles.getPropertyValue(key));
                }
                const { left: left , top: top , width: width , height: height  } = draggable.getBoundingClientRect();
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
        return $f3Ts0$html`
      <viskit-reorder
        .enable=${this.enable && this.inEnable}
        .canStart=${(e)=>{
            this.selectedDragEl = e.data.draggable;
            return true;
        }}
        @viskit-start=${()=>{
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
        return $113d663bca6ee001$var$__awaiter(this, void 0, void 0, function*() {
            if (map.has("containerSelector") && this.containerSelector) this.containers = Array.from(this.querySelectorAll(this.containerSelector));
            if (map.has("containers") && this.containers) this.containers.forEach((c)=>this.addStyle(c)
            );
        });
    }
    addStyle(container) {
        Array.from(container.children).forEach((el)=>{
            el.style.transition = "transform .2s";
        });
    }
    onEnd(ev) {
        if (this.inEnable) this.inEnable = false;
        const data = ev.data;
        if (data) {
            data.hoverContainer && $113d663bca6ee001$var$clear(data.hoverContainer.children);
            data.container && $113d663bca6ee001$var$clear(data.container.children, true);
            this.dispatchEvent(new CustomEvent("viskit-end"));
        }
        if (this.selectedDragEl) {
            this.selectedDragEl.style.setProperty("opacity", "unset");
            this.selectedDragEl = null;
        }
        this.dragEl && this.dragEl.remove();
    }
    onDrag({ data: data , deltaY: deltaY , container: container  }) {
        this.dragEl.style.transform = `translateY(${deltaY}px)`;
    }
    onReorder({ data: data , y: y , container: container , hoverIndex: hoverIndex , hoverable: hoverable , hoverContainer: hoverContainer , draggable: draggable , draggableIndex: draggableIndex , draggableRect: draggableRect , hoverableRect: hoverableRect ,  }) {
        if (hoverableRect && draggableRect) {
            const prevHoverContainer = data.hoverContainer;
            // clear prev
            let index = hoverIndex;
            // clear previous cntainer's children transform
            if (prevHoverContainer !== hoverContainer && prevHoverContainer) $113d663bca6ee001$var$clear(prevHoverContainer.children);
            if (container === hoverContainer) {
                if (hoverIndex === draggableIndex) $113d663bca6ee001$var$clear(hoverContainer.children);
                else if (hoverIndex < draggableIndex) {
                    if (y > hoverableRect.top + hoverableRect.height / 2) {
                        ++index;
                        data.after = true;
                    } else data.after = false;
                    if (index === draggableIndex) $113d663bca6ee001$var$clear(hoverContainer.children);
                    else {
                        const children = Array.from(hoverContainer.children);
                        this.addStyle(hoverContainer);
                        for(let i = 0, len = children.length; i < len; i++){
                            let y = 0;
                            if (i >= index && i < draggableIndex) y = draggableRect.height;
                            children[i].style.transform = `translateY(${y}px)`;
                        }
                    }
                } else {
                    if (y < hoverableRect.top + hoverableRect.height / 2) {
                        --index;
                        data.after = false;
                    } else data.after = true;
                    if (index === draggableIndex) $113d663bca6ee001$var$clear(hoverContainer.children);
                    else {
                        const children = Array.from(hoverContainer.children);
                        this.addStyle(hoverContainer);
                        for(let i = 0, len = children.length; i < len; i++){
                            let y = 0;
                            if (i > draggableIndex && i <= index) y = -draggableRect.height;
                            children[i].style.transform = `translateY(${y}px)`;
                        }
                    }
                }
            } else {
                const fromTop = draggableRect.top < hoverableRect.top;
                if (y > hoverableRect.top + hoverableRect.height / 2) {
                    ++index;
                    data.after = true;
                } else data.after = false;
                const children = Array.from(hoverContainer.children);
                for(let i = 0, len = children.length; i < len; i++){
                    let y = 0;
                    if (index === children.length) y = -draggableRect.height;
                    else if (i >= index) y = draggableRect.height;
                    this.addStyle(hoverContainer);
                    if (fromTop && hoverIndex === 0 && !data.after || !fromTop && hoverIndex === hoverContainer.children.length - 1 && data.after) y = y / 2;
                    children[i].style.transform = `translateY(${y}px)`;
                }
            }
            data.hoverContainer = hoverContainer;
            data.dropIndex = index;
        }
    }
    onDrop({ data: data , complete: complete  }) {
        if (data.draggable !== data.hoverable) complete(data.after);
    }
}
$113d663bca6ee001$export$f40fc8d0c925c16f.styles = $f3Ts0$css`
    :host {
      display: block;
    }
  `;
$113d663bca6ee001$var$__decorate([
    $f3Ts0$property({
        type: Boolean
    })
], $113d663bca6ee001$export$f40fc8d0c925c16f.prototype, "enable", void 0);
$113d663bca6ee001$var$__decorate([
    $f3Ts0$state()
], $113d663bca6ee001$export$f40fc8d0c925c16f.prototype, "inEnable", void 0);
$113d663bca6ee001$var$__decorate([
    $f3Ts0$query("viskit-reorder")
], $113d663bca6ee001$export$f40fc8d0c925c16f.prototype, "reorder", void 0);
$113d663bca6ee001$var$__decorate([
    $f3Ts0$query("div")
], $113d663bca6ee001$export$f40fc8d0c925c16f.prototype, "div", void 0);
$113d663bca6ee001$var$__decorate([
    $f3Ts0$property()
], $113d663bca6ee001$export$f40fc8d0c925c16f.prototype, "containerSelector", void 0);
$113d663bca6ee001$var$__decorate([
    $f3Ts0$property({
        attribute: false,
        hasChanged (containers) {
            return Array.isArray(containers) && containers.every((c)=>c instanceof HTMLElement
            );
        }
    })
], $113d663bca6ee001$export$f40fc8d0c925c16f.prototype, "containers", void 0);
window.customElements.define("viskit-reorder-list", $113d663bca6ee001$export$f40fc8d0c925c16f);


export {$113d663bca6ee001$export$f40fc8d0c925c16f as ReorderList, $113d663bca6ee001$exports as default};
//# sourceMappingURL=module.js.map
