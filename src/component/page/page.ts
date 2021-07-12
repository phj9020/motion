import { BaseComponent, Component } from '../component.js';

// 여러가지를 모아서 조립하는 Composable
export interface Composable {
    addChild(child: Component) : void;
}

class PageItemComponent extends BaseComponent<HTMLElement> implements Composable {
    constructor() {
        super(`
            <li class="page-item">
                
            </li>
        `)
    }
    addChild(child: Component){
        // const container = this.element.querySelector(".page-item__body")! as HTMLElement;
        child.attachTo(this.element);
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
    }
    
}