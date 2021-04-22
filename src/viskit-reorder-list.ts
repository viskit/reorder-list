import "@viskit/viskit-reorder";
import {
  Reorder,
  onDragEvent,
  onDropEvent,
  onStartEvent,
} from "@viskit/viskit-reorder";
import { html, LitElement, css, query, property } from "lit-element";
import * as Rematrix from "rematrix";
import { createStyleTag } from "@viskit/create-style";
const wrap = "wrap-" + Date.now();

export class ReorderList extends LitElement {
  @query("viskit-reorder")
  reorder: Reorder;

  createRenderRoot() {
    return this;
  }

  static get styles() {
    createStyleTag(
      ` .container > * {
    transition: transform 0.5s;
  }
  .container > .draggable {
    transition: unset;
  } `,
      wrap
    );
    return css``;
  }

  constructor() {
    super();
    this.onStart = this.onStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  private hoverIndex: number;

  private oldDraggableTransform: string = "";
  private dragContainer: HTMLElement = null;

  reorderMove({
    detail: { el, container, reorder, hoverContainer, hoverEl, hoverIndex },
  }: onDragEvent) {
    if (container === hoverContainer) {
      const { itemDataMap } = reorder.dataCacheMap.get(container);
      const {
        rect: { height },
        index: elIndex,
      } = itemDataMap.get(el);

      const { index: hoverElIndex } = itemDataMap.get(hoverEl);

      const items = Array.from(container.children);
      for (let i = 0, len = items.length; i < len; i++) {
        const item = items[i] as HTMLElement;
        const style = item.style;
        let value = "";
        if (i > elIndex && i <= hoverElIndex) {
          value = `translateY(${-height}px)`;
        } else if (i < elIndex && i >= hoverElIndex) {
          value = `translateY(${height}px)`;
        }

        style["transform"] = value;
      }
    }
  }

  firstUpdated() {
    this.classList.add(wrap);
    this.reorder.addEventListener("onStart", this.onStart);
    this.reorder.addEventListener("onDrag", this.onDrag);
    this.reorder.addEventListener("onDrop", this.onDrop);
  }

  disconnectedCallback() {
    this.reorder.removeEventListener("onStart", this.onStart);
    this.reorder.removeEventListener("onDrag", this.onDrag);
    this.reorder.removeEventListener("onDrop", this.onDrop);
  }

  onStart({ detail: { container, el, gestureDetail, reorder } }: onStartEvent) {
    this.dragContainer = container;
    if (this.draggableClass) {
      el.classList.add(this.draggableClass);
    }
    this.oldDraggableTransform = el.style.transform;
  }

  onDrag(event: onDragEvent) {
    const {
      detail: {
        el,
        container,
        hoverContainer,
        hoverEl,
        hoverIndex,
        reorder,
        gestureDetail: { deltaY },
      },
    } = event;
    // drag el
    let transform = Rematrix.fromString(this.oldDraggableTransform);
    el.classList.add("draggable");
    el.style.transform = Rematrix.toString(
      [transform, Rematrix.translateY(deltaY)].reduce(Rematrix.multiply)
    );
    if (this.hoverIndex !== hoverIndex) {
      this.hoverIndex = hoverIndex;
      this.reorderMove(event);
    }
  }

  onDrop({ detail: { el } }: onDropEvent) {
    if (this.draggableClass) {
      el.classList.remove(this.draggableClass);
    }
    el.style.transform = this.oldDraggableTransform;
  }

  async updated(map: Map<string, any>) {
    if (map.has("containerSelector")) {
      this.reorder.containerSelectors = this.containerSelector
        ? [this.containerSelector]
        : null;
      await this.reorder.updateComplete;
      for (let container of this.reorder.containers) {
        container.classList.add("container");
      }
    }
  }

  @property({ type: String })
  containerSelector: string = "";

  @property({ type: String })
  draggableClass: string = "";
}

window.customElements.define("viskit-reorder-list", ReorderList);
declare global {
  interface HTMLElementTagNameMap {
    "viskit-reorder-list": ReorderList;
  }
}
