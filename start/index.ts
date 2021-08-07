import "../src/viskit-reorder-list";
import "@viskit/content";
import { html, LitElement } from "lit-element";

export class Demo extends LitElement {
  render() {
    return html`
      <viskit-content>
        <viskit-reorder-list draggableClass="draggable">
          <viskit-reorder>
            <div>item a</div>
            <div>item b</div>
            <div>item c</div>
            <div>item d</div>
          </viskit-reorder>
        </viskit-reorder-list>
      </viskit-content>
    `;
  }
}

window.customElements.define("zl-demo",Demo);