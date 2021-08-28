import "../src";
import "@viskit/content";
import { html, LitElement, css } from "lit-element";
import { state, query } from "lit-element/decorators.js";
import { defineCustomElements } from "@ionic/core/loader";

defineCustomElements(window);

export class Demo extends LitElement {
  static styles = css`
    ion-app {
      height: 100%;
    }
  `;

  @query("ion-list")
  list: HTMLIonListElement;

  @state()
  bool = true;

  render() {
    return html`
      <ion-app>
        <ion-content fullscreen>
          <viskit-reorder-list
            .containerSelector=${"ion-list"}
            .enable=${this.bool}
          >
            <ion-list>
              <ion-item>aaa</ion-item>
              <ion-item-sliding >
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

                <ion-item  >
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
        </ion-content>
      </ion-app>
    `;
  }
}

window.customElements.define("zl-demo", Demo);
