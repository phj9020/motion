import { BaseComponent, Component } from '../component.js';

// 여러가지를 모아서 조립하는 Composable
export interface Composable {
    addChild(child: Component) : void;
}

type onCloseListener = ()=> void;

class PageItemComponent extends BaseComponent<HTMLElement> implements Composable {
    private closeListener?: onCloseListener
    constructor() {
        super(`
            <li class="page-item">
                <div class="content_delete_container">
                    <button class="content_delete_btn">X</button>
                </div>
            </li>
        `);
        const closeButton = this.element.querySelector(".content_delete_btn")! as HTMLButtonElement;
        closeButton.onclick = () => {
            this.closeListener && this.closeListener();
        };
    }
    addChild(child: Component){
        // const container = this.element.querySelector(".page-item__body")! as HTMLElement;
        child.attachTo(this.element);
    }
    setOnCloseListener(listener: onCloseListener){
        this.closeListener = listener;
    }
}
export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable{
    constructor() {
        super(`
            <ul class="page"></ul>
        `
        );
        console.log(this.element)
    }
    
    addChild(section: Component) {
        const item = new PageItemComponent();
        item.addChild(section);
        item.attachTo(this.element, 'beforeend');
        item.setOnCloseListener(()=> {
            item.removeFrom(this.element);
        })
    }
    
}