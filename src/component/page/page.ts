import { BaseComponent, Component } from '../component.js';

// 여러가지를 모아서 조립하는 Composable
export interface Composable {
    addChild(child: Component) : void;
}

type onCloseListener = ()=> void;

interface SectionContainer extends Component, Composable {
    setOnCloseListener(listener: onCloseListener): void;
}

type SectionContainerConstructor = {
    new(): SectionContainer;
}

export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer {
    private closeListener?: onCloseListener
    constructor() {
        super(`
            <li draggable="true" class="page-item">
                <div class="content_delete_container">
                    <button class="content_delete_btn">X</button>
                </div>
            </li>
        `);
        const closeButton = this.element.querySelector(".content_delete_btn")! as HTMLButtonElement;
        closeButton.onclick = () => {
            this.closeListener && this.closeListener();
        };

        this.element.addEventListener("dragstart", (event:DragEvent) => {
            this.onDragStart(event)
        })
        this.element.addEventListener("dragend", (event:DragEvent) => {
            this.onDragEnd(event)

        })

    }
    addChild(child: Component){
        // const container = this.element.querySelector(".page-item__body")! as HTMLElement;
        child.attachTo(this.element);
    }
    setOnCloseListener(listener: onCloseListener){
        this.closeListener = listener;
    }
    onDragStart(event : DragEvent){
        console.log('dragstart', event.currentTarget)
    }
    onDragEnd(event : DragEvent){
        console.log('dragend', event)

    }

}


export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable{
    constructor(private pageItemContructor: SectionContainerConstructor) {
        super(`
            <ul class="page"></ul>
        `
        );
        this.element.addEventListener("dragover", (event: DragEvent) => {
            this.onDragOver(event);
        });
        this.element.addEventListener("drop", (event: DragEvent) => {
            this.onDragDrop(event);
        });
    }
    
    addChild(section: Component) {
        const item = new this.pageItemContructor();
        item.addChild(section);
        item.attachTo(this.element, 'beforeend');
        item.setOnCloseListener(()=> {
            item.removeFrom(this.element);
        })
    }
    
    onDragOver(event: DragEvent){
        event.preventDefault();
        console.log("dragover", event)
    }

    onDragDrop(event: DragEvent) {
        event.preventDefault();
        console.log("drop", event);
    }
}