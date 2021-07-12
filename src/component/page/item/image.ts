import { BaseComponent } from "../../component.js";

export class ImageComponent extends BaseComponent<HTMLElement>{
    constructor(title: string, url: string){
        super(`
            <section class="content_board--imageVideo">
                <div class="image-holder">
                    <img class="image__thumbnail" />
                </div>
                <div class="content_text_container">
                    <h2 class="content_title"></h2>
                </div>
                <div class="content_remove-imageVideo">
                    <button class="content_delete_btn">X</button>
                </div>
            </section>
        `)
        const imageElement = this.element.querySelector(".image__thumbnail")! as HTMLImageElement;
        imageElement.src = url;
        imageElement.alt = title;
        
        const titleElement = this.element.querySelector(".content_title")! as HTMLHeadingElement;
        titleElement.textContent = title;
    
    }

}