import "@viskit/reorder";
import { Reorder, onDragEvent, onDropEvent, onStartEvent } from "@viskit/reorder";
import { LitElement } from "lit-element";
export declare class ReorderList extends LitElement {
    reorder: Reorder;
    createRenderRoot(): this;
    constructor();
    private hoverIndex;
    private oldDraggableTransform;
    private dragContainer;
    private oldTransformMap;
    reorderMove({ detail: { el, container, reorder, hoverContainer, hoverEl, hoverIndex }, }: onDragEvent): void;
    firstUpdated(): void;
    disconnectedCallback(): void;
    onStart({ detail: { container, el, gestureDetail, reorder } }: onStartEvent): void;
    onDrag(event: onDragEvent): void;
    onDrop({ detail: { el, complete } }: onDropEvent): void;
    updated(map: Map<string, any>): Promise<void>;
    containerSelector: string;
    draggableClass: string;
}
declare global {
    interface HTMLElementTagNameMap {
        "viskit-reorder-list": ReorderList;
    }
}
