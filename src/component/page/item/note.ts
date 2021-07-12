import { BaseComponent } from "../../component.js";

export class NoteComponent extends BaseComponent<HTMLElement> {
    constructor(title: string, body: string) {
        super(`
            <section class="content_board-noteTask">
                <div class="content_text_body_container">
                    <h2 class="content_title"></h2>
                    <p class="content_body"></p>
                </div>
            </section>
            `
        );
        const titleElement = this.element.querySelector(".content_title")! as HTMLHeadingElement;
        titleElement.textContent = title;
        
        const textElement = this.element.querySelector(".content_body")! as HTMLParagraphElement;
        textElement.textContent = body;

    }
}