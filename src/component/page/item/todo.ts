import { BaseComponent } from "../../component.js";

export class TodoComponent extends BaseComponent<HTMLElement> {
    constructor(title: string, todo: string) {
        super(`
            <section class="content_board-noteTask">
                <div class="content_text_body_container">
                    <h2 class="content_title">title</h2>
                    <input type="checkbox" class="todo-checkbox">
                </div>
                <div class="content_remove-noteTask">
                    <button class="content_delete_btn">X</button>
                </div>
            </section>
        `);
    
        const titleElement = this.element.querySelector(".content_title")! as HTMLHeadingElement;
        titleElement.textContent = title;

        const todoElement = this.element.querySelector(".todo-checkbox")! as HTMLInputElement;
        todoElement.textContent = todo;
    }
}