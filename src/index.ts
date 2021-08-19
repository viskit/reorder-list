import "@viskit/reorder";
import {
  Reorder,
  StartEvent,
  DropEvent,
  ReorderEvent,
  DragEvent,
} from "@viskit/reorder";
import { LitElement, html, css } from "lit";
import { query, property,state } from "lit/decorators.js";
import * as Rematrix from "rematrix";
import clone from "clone-element";

const clear = (children: HTMLCollection,deep = false) => {
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

  render() {
    return html`
      <viskit-reorder
        @viskit-start=${this.onStart}
        @viskit-drag=${this.onDrag}
        @viskit-reorder=${this.onReorder}
        @viskit-drop=${this.onDrop}
        .containers=${this.containers}
      >
        <slot></slot>
      </viskit-reorder>
    `;
  }

  @query("viskit-reorder")
  reorder: Reorder;

  @property()
  containerSelector = ""

  @state()
  containers: HTMLElement[] = [this];

  updated(map: Map<string,any>){
    if(map.has("containerSelector") && this.containerSelector){
      this.containers = Array.from(this.querySelectorAll(this.containerSelector)) as HTMLElement[]
    }

    if(map.has("containers") ){
      this.containers.forEach(c=>this.addStyle(c));
    }
  }

  addStyle(container: HTMLElement){
    (Array.from(container.children) as HTMLElement[]).forEach(el=>{
      el.style.transition = "transform .2s";
    })
  }

  onStart({ draggable, data, container, deltaX }: StartEvent) {
    console.log("cannnn")
    // clone
    const dragEl = draggable.cloneNode(true) as HTMLElement;
    const { left, top, width, height } = draggable.getBoundingClientRect();
    dragEl.style.position = "absolute";
    dragEl.style.top = top + "px";
    dragEl.style.left = left + "px";
    dragEl.style.pointerEvents = "none";
    dragEl.style.margin = "0";
    dragEl.style.width = width + "px";
    dragEl.style.height = height + "px";
    dragEl.style.transition = "";
    dragEl.classList.add("draggable");

    // dragEl.style.transform = `translateY(${}px)`;
    data.dragEl = dragEl;

    document.body.appendChild(dragEl);

    draggable.style.opacity = "0";
  }

  onDrag({ data, deltaY ,container}: DragEvent) {

    data.dragEl.style.transform = `translateY(${deltaY}px)`;
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
    data.dragEl.remove();
    data.draggable.style.opacity = "1";
    data.hoverContainer && clear(data.hoverContainer.children);
    data.container && clear(data.container.children,true);

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
