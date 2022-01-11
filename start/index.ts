import "../src";
import "@viskit/scroll-content";
import { html, LitElement, css } from "lit-element";
import { state, query } from "lit-element/decorators.js";
import { ScrollContent } from "@viskit/scroll-content";
import { ReorderEvent } from "@viskit/reorder";
import { ReorderList } from "../src";
import { FixedController } from "@viskit/scroll-content-fixed-controller";

export class Demo extends LitElement {
  static styles = css`
    #app {
      height: 100px;
    }
  `;

  @query("viskit-reorder-list")
  reorderList: ReorderList;

  @query("viskit-scroll-content")
  content: ScrollContent;

  @state()
  bool = true;

  stop: () => void = null;

  async firstUpdated() {
    await this.content.updateComplete;
    const fixed = new FixedController(this.content);
    this.content.scrollToBottom();
    let scrollTop;
    setTimeout(() => {
      this.reorderList.reorder.addEventListener("viskit-start", () => {
        this.content.disable = true;
        scrollTop = this.content.content.scrollTop;
      });

      this.reorderList.reorder.addEventListener(
        "viskit-reorder",
        (ev: ReorderEvent) => {
          if (ev.currentY < 10) {
            this.content.scrolling(-1);
          } else {
            this.content.stopScrolling();

            const offsetY = this.content.content.scrollTop - scrollTop;
            this.reorderList.reorder.mutation({
              x: 0,
              y: offsetY,
            });
          }
        }
      );
    }, 200);
  }

  render() {
    return html`
      <div id="app">
        <viskit-scroll-content>
          <viskit-reorder-list .containerSelector=${"ul"} .enable=${this.bool}>
            <ul>
              <li>111</li>
              <li>222</li>
              <li>333</li>
              <li>444</li>
              <li>555</li>
              <li>666</li>
              <li>777</li>
              <li>777</li>
              <li>777</li>
              <li>777</li>
              <li>777</li>
              <li>777</li>
              <li>777</li>
              <li>777</li>
              <li>777</li>
              <li>777</li>
              <li>777</li>
              <li>777</li>
              <li>777</li>
              <li>777</li>
            </ul>
          </viskit-reorder-list>
        </viskit-scroll-content>
      </div>
    `;
  }
}

window.customElements.define("zl-demo", Demo);
