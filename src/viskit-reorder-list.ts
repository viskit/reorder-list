import "@viskit/viskit-reorder";
import {
  Reorder,
  onDragEvent,
  onDropEvent,
  onStartEvent,
} from "@viskit/viskit-reorder";
import { html, LitElement, css, query, property } from "lit-element";

export class ReorderList extends LitElement {
  @query("viskit-reorder")
  reorder: Reorder;

  static get styles() {
    return [css``];
  }

  reorderMove(draggableEl: Element, fromIndex: number, toIndex: number) {
    const itemHeight = draggableEl.getBoundingClientRect().height;
    // const children = Array.from(el.parentElement.children);
    // for (let i = 0; i < children.length; i++) {
    //   const child = children[i];
    //   const style = child.style;
    //   let value = "";
    //   if (i > fromIndex && i <= toIndex) {
    //     value = `translateY(${-itemHeight}px)`;
    //   } else if (i < fromIndex && i >= toIndex) {
    //     value = `translateY(${itemHeight}px)`;
    //   }
    //   console.log("item " + child.id + "'s transform = ", value);
    //   style["transform"] = value;
    // }
  }

  onStart(event: onStartEvent) {}

  onDrag(event: onDragEvent) {}

  onDrop(event: onDropEvent) {}

  @property({ type: String })
  containerSelector: string = "";

  render() {
    return html`
      <viskit-reorder
        .containerSelectors=${this.containerSelector
          ? [this.containerSelector]
          : null}
        @onStart=${(ev) => this.onStart(ev)}
        @onDrag=${(ev) => this.onDrag(ev)}
        @onDrop=${(ev) => this.onDrop(ev)}
      >
        <slot></slot>
      </viskit-reorder>
    `;
  }
}
