import "../src";
import "@viskit/content";
import { html, LitElement, css } from "lit-element";
import { defineCustomElements } from "@ionic/core/loader";
defineCustomElements(window);

export class Demo extends LitElement {
  static styles = css`
    ion-app {
      height: 100%;
    }
  `;
  render() {
    return html`
      <ion-app>
        <ion-content fullscreen>
          <viskit-reorder-list .containerSelector=${"ion-list"}>
            <ion-list>
              <ion-item>aaa</ion-item>
              <ion-item-sliding>
                <ion-item-options side="start">
                  <ion-item-option  
                    >Favorite</ion-item-option
                  >
                  <ion-item-option color="danger" 
                    >Share</ion-item-option
                  >
                </ion-item-options>

                <ion-item>
                  <ion-label>Item 1</ion-label>
                </ion-item>

                <ion-item-options side="end">
                  <ion-item-option 
                    >Unread</ion-item-option
                  >
                </ion-item-options>
              </ion-item-sliding>
              <ion-item-sliding>
                <ion-item-options side="start">
                  <ion-item-option  
                    >Favorite</ion-item-option
                  >
                  <ion-item-option color="danger" 
                    >Share</ion-item-option
                  >
                </ion-item-options>

                <ion-item>
                  <ion-label>Item 2</ion-label>
                </ion-item>

                <ion-item-options side="end">
                  <ion-item-option 
                    >Unread</ion-item-option
                  >
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
