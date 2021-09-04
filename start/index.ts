import "../src";
import "@viskit/content";
import { html, LitElement, css } from "lit-element";
import { state, query } from "lit-element/decorators.js";
import { defineCustomElements } from "@ionic/core/loader";
import { Content } from "@viskit/content";
import { ReorderEvent } from "@viskit/reorder";
import { ReorderList } from "../src";

defineCustomElements(window);

export class Demo extends LitElement {
  static styles = css`
    ion-app {
      height: 100%;
    }
  `;

  @query("ion-list")
  list: HTMLIonListElement;

  @query("viskit-reorder-list")
  reorderList: ReorderList;

  @query("viskit-content")
  content: Content;

  @state()
  bool = true;

  stop: () => void = null;

  firstUpdated() {
    setTimeout(() => {
      let scrollTop = 0;

      this.reorderList.reorder.addEventListener("viskit-start", () => {
        this.content.scrollable = false;
        scrollTop = this.content.scrollEl.scrollTop;
      });

      this.reorderList.reorder.addEventListener(
        "viskit-reorder",
        (ev: ReorderEvent) => {
          if (ev.currentY < 10) {
            this.reorderList.reorder;
            if (!this.stop) {
              this.stop = this.content.scrollToDir(-1);
            }
          } else {
            if (this.stop) {
              this.stop();
              this.stop = null;
              const offsetY = this.content.scrollEl.scrollTop - scrollTop;
              console.log("offsetY", offsetY);
              this.reorderList.reorder.mutation({
                x: 0,
                y: offsetY,
              });
            }
          }
        }
      );
    }, 200);
  }

  render() {
    return html`
      <ion-app>
        <ion-content fullscreen>
          <viskit-content>
            <viskit-reorder-list
              .containerSelector=${"ion-list"}
              .enable=${this.bool}
              @viskit-end=${() => {
                this.content.scrollable = true;
                this.stop && this.stop();
              }}
            >
              <ion-list>
                <ion-item-sliding>
                  <ion-item-options side="start">
                    <ion-item-option
                      @click=${async () => {
                        await this.list.closeSlidingItems();
                        this.bool = true;
                      }}
                      >Favorite</ion-item-option
                    >
                    <ion-item-option
                      color="danger"
                      @click=${async () => {
                        await this.list.closeSlidingItems();
                        this.bool = true;
                      }}
                      >Share</ion-item-option
                    >
                  </ion-item-options>

                  <ion-item>
                    <ion-label>Item 1</ion-label>
                  </ion-item>

                  <ion-item-options side="end">
                    <ion-item-option>Unread</ion-item-option>
                  </ion-item-options>
                </ion-item-sliding>
                <ion-item-sliding>
                  <ion-item-options side="start">
                    <ion-item-option>Favorite</ion-item-option>
                    <ion-item-option color="danger">Share</ion-item-option>
                  </ion-item-options>

                  <ion-item>
                    <ion-label>Item 2</ion-label>
                  </ion-item>

                  <ion-item-options side="end">
                    <ion-item-option>Unread</ion-item-option>
                  </ion-item-options>
                </ion-item-sliding>
              </ion-list>
            </viskit-reorder-list>
          </viskit-content>
        </ion-content>
      </ion-app>
    `;
  }
}

window.customElements.define("zl-demo", Demo);
