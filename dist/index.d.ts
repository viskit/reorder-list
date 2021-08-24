import "@viskit/reorder";
import { Reorder, DropEvent, ReorderEvent, DragEvent, EndEvent } from "@viskit/reorder";
import { LitElement } from "lit";
export declare class ReorderList extends LitElement {
    static styles: import("lit").CSSResultGroup;
    enable: boolean;
    inEnable: boolean;
    dragEl: HTMLElement;
    selectedDragEl: HTMLElement;
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
    reorder: Reorder;
    div: HTMLElement;
    containerSelector: string;
    containers: HTMLElement[];
    updated(map: Map<string, any>): Promise<void>;
    addStyle(container: HTMLElement): void;
    onEnd({ data }: EndEvent): void;
    onDrag({ data, deltaY, container }: DragEvent): void;
    onReorder({ data, y, container, hoverIndex, hoverable, hoverContainer, draggable, draggableIndex, draggableRect, hoverableRect, }: ReorderEvent): void;
    onDrop({ data, complete }: DropEvent): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "viskit-reorder-list": ReorderList;
    }
}
