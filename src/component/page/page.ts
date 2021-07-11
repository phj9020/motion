import { BaseComponent } from '../component.js';
// import { ImageComponent } from "./item/image.js";

export class PageComponent extends BaseComponent<HTMLUListElement>{
    // private readonly image : ImageComponent;
    // private element: HTMLUListElement;
    // private liElement: HTMLLIElement;
    constructor() {
        super(`
        <ul class="page">This is PageComponenet!</ul>
        `
        );

    }
    
    
}