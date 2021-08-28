import "@viskit/reorder";
import {
  Reorder,
  StartEvent,
  DropEvent,
  ReorderEvent,
  DragEvent,
  EndEvent,
} from "@viskit/reorder";
import {GestureDetail} from "@ionic/core";
import { LitElement, html, css } from "lit";
import { query, property, state } from "lit/decorators.js";

import { register } from "@viskit/long-press";

const clear = (children: HTMLCollection, deep = false) => {
  const childrens = Array.from(children) as HTMLElement[];
  childrens.forEach((c) => {
    c.style.transform = "";
    deep && (c.style.transition = "");
  });
};

export class ReorderList extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  @property({ type: Boolean })
  enable = false;

  @state()
  inEnable = false;

  dragEl: HTMLElement;

  selectedDragEl: HTMLElement;

  firstUpdated() {
    register(this.shadowRoot);
    this.addEventListener(
      "long-press",
      (e: PointerEvent) => {
        const draggable = this.selectedDragEl;

        if(draggable){
          this.inEnable = true;

          const dragEl = draggable.cloneNode(true) as HTMLElement;
          const styles = window.getComputedStyle(draggable);

          for (let i = 0, len = styles.length; i < len; i++) {
            const key = styles.item(i);
            dragEl.style.setProperty(key, styles.getPropertyValue(key));
          }

          const { left, top, width, height } =
            draggable.getBoundingClientRect();
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

          (draggable as HTMLElement).style.opacity = "0";

        }
      },
      true
    );
  }

  render() {
    return html`
      <viskit-reorder
        .enable=${this.enable && this.inEnable}
        .canStart=${( e:GestureDetail)=>{
          console.log(e.data.draggable);
          this.selectedDragEl = e.data.draggable;
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

  @query("viskit-reorder")
  reorder: Reorder;

  @query("div")
  div: HTMLElement;

  @property()
  containerSelector = "";

  @state()
  containers: HTMLElement[] = [this];

  async updated(map: Map<string, any>) {
    if (map.has("containerSelector") && this.containerSelector) {
      this.containers = Array.from(
        this.querySelectorAll(this.containerSelector)
      ) as HTMLElement[];
    }

    if (map.has("containers")) {
      this.containers.forEach((c) => this.addStyle(c));
    }
  }

  addStyle(container: HTMLElement) {
    (Array.from(container.children) as HTMLElement[]).forEach((el) => {
      el.style.transition = "transform .2s";
    });
  }

  onEnd(ev: EndEvent | PointerEvent) {
    if (this.inEnable) {
      this.inEnable = false;
    }

    const data = (ev as EndEvent).data;
    if (data) {
      data.hoverContainer && clear(data.hoverContainer.children);
      data.container && clear(data.container.children, true);
    }
    this.selectedDragEl &&
      this.selectedDragEl.style.setProperty("opacity", "unset");
    this.dragEl && this.dragEl.remove();
  }

  onDrag({ data, deltaY, container }: DragEvent) {
    this.dragEl.style.transform = `translateY(${deltaY}px)`;
  }

  onReorder({
    data,
    y,
    container,
    hoverIndex,
    hoverable,
    hoverContainer,
    draggable,
    draggableIndex,
    draggableRect,
    hoverableRect,
  }: ReorderEvent) {
    const prevHoverContainer = data.hoverContainer as HTMLElement;

    // clear prev

    let index = hoverIndex;

    // clear previous cntainer's children transform
    if (prevHoverContainer !== hoverContainer && prevHoverContainer) {
      clear(prevHoverContainer.children);
    }

    if (container === hoverContainer) {
      if (hoverIndex === draggableIndex) {
        clear(hoverContainer.children);
      } else if (hoverIndex < draggableIndex) {
        if (y > hoverableRect.top + hoverableRect.height / 2) {
          ++index;
          data.after = true;
        } else {
          data.after = false;
        }
        if (index === draggableIndex) {
          clear(hoverContainer.children);
        } else {
          const children = Array.from(hoverContainer.children) as HTMLElement[];
          this.addStyle(hoverContainer);
          for (let i = 0, len = children.length; i < len; i++) {
            let y = 0;
            if (i >= index && i < draggableIndex) {
              y = draggableRect.height;
            }
            children[i].style.transform = `translateY(${y}px)`;
          }
        }
      } else {
        if (y < hoverableRect.top + hoverableRect.height / 2) {
          --index;
          data.after = false;
        } else {
          data.after = true;
        }

        if (index === draggableIndex) {
          clear(hoverContainer.children);
        } else {
          const children = Array.from(hoverContainer.children) as HTMLElement[];
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
    } else {
      const fromTop = draggableRect.top < hoverableRect.top;

      if (y > hoverableRect.top + hoverableRect.height / 2) {
        ++index;
        data.after = true;
      } else {
        data.after = false;
      }
      const children = Array.from(hoverContainer.children) as HTMLElement[];
      for (let i = 0, len = children.length; i < len; i++) {
        let y = 0;

        if (index === children.length) {
          y = -draggableRect.height;
        } else {
          if (i >= index) {
            y = draggableRect.height;
          }
        }

        this.addStyle(hoverContainer);

        if (
          (fromTop && hoverIndex === 0 && !data.after) ||
          (!fromTop &&
            hoverIndex === hoverContainer.children.length - 1 &&
            data.after)
        ) {
          y = y / 2;
        }
        children[i].style.transform = `translateY(${y}px)`;
      }
    }

    data.hoverContainer = hoverContainer;
    data.dropIndex = index;
  }

  onDrop({ data, complete }: DropEvent) {
    if (data.draggable !== data.hoverable) {
      complete(data.after);
    }
  }
}

window.customElements.define("viskit-reorder-list", ReorderList);
declare global {
  interface HTMLElementTagNameMap {
    "viskit-reorder-list": ReorderList;
  }
}
