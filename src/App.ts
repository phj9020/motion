
import { Component } from "./component/component.js";
import { InputDialog } from "./component/dialog/dialog.js";
import { ImageComponent } from "./component/page/item/image.js";
import { NoteComponent } from "./component/page/item/note.js";
import { TodoComponent } from "./component/page/item/todo.js";
import { VideoComponent } from "./component/page/item/video.js";
import { Composable, PageComponent, PageItemComponent } from "./component/page/page.js";


class App {
    private readonly page: Component & Composable;
    constructor(appRoot: HTMLElement) {
        this.page = new PageComponent(PageItemComponent);
        
        const image = new ImageComponent('image Title', "https://picsum.photos/550/300")
        this.page.addChild(image);

        const imageBtn = document.querySelector("#new-image")! as HTMLButtonElement;
        imageBtn.addEventListener("click", ()=> {
            const diablog = new InputDialog();
            diablog.setOnCloseListener(()=> {
                diablog.removeFrom(document.body);
            });

            diablog.setOnSubmitListener(()=> {
                // To do : submit 시 섹션 생성 후 페이지 추가 
                diablog.removeFrom(document.body);
            })

            diablog.attachTo(document.body);
        });

        const note = new NoteComponent("note title", "this is body paragraphasdsadasdasd");
        this.page.addChild(note);
        
        const todo = new TodoComponent('Todo Title', 'Todo Item');
        this.page.addChild(todo);

        const video = new VideoComponent("Video title", "https://youtu.be/8QKPLYpObd8")
        this.page.addChild(video);

        this.page.attachTo(appRoot);
    }
};


new App(document.querySelector(".content_board_container")! as HTMLElement)

