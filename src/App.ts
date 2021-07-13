import { Component } from "./component/component.js";
import { InputDialog } from "./component/dialog/dialog.js";
import { MediaInput } from "./component/dialog/input/media-input.js";
import { TextInput } from "./component/dialog/input/text-input.js";
import { ImageComponent } from "./component/page/item/image.js";
import { NoteComponent } from "./component/page/item/note.js";
import { TodoComponent } from "./component/page/item/todo.js";
import { VideoComponent } from "./component/page/item/video.js";
import { Composable, PageComponent, PageItemComponent } from "./component/page/page.js";


class App {
    private readonly page: Component & Composable;
    constructor(appRoot: HTMLElement, dialogRoot: HTMLElement) {
        this.page = new PageComponent(PageItemComponent);
        
        const imageBtn = document.querySelector("#new-image")! as HTMLButtonElement;
        imageBtn.addEventListener("click", ()=> {
            const diablog = new InputDialog();
            const mediaInput = new MediaInput();
            
            diablog.addChild(mediaInput);
            diablog.attachTo(dialogRoot);
            
            diablog.setOnCloseListener(()=> {
                diablog.removeFrom(dialogRoot);
            });
            
            diablog.setOnSubmitListener(()=> {
                const image = new ImageComponent(mediaInput.title, mediaInput.url)
                this.page.addChild(image);
                diablog.removeFrom(dialogRoot);
            })
            
        });
        const videoBtn = document.querySelector("#new-video")! as HTMLButtonElement;
        videoBtn.addEventListener("click", ()=> {
            const diablog = new InputDialog();
            const mediaInput = new MediaInput();
            
            diablog.addChild(mediaInput);
            diablog.attachTo(dialogRoot);
            
            diablog.setOnCloseListener(()=> {
                diablog.removeFrom(dialogRoot);
            });
            
            diablog.setOnSubmitListener(()=> {
                const video = new VideoComponent(mediaInput.title, mediaInput.url)
                this.page.addChild(video);
                diablog.removeFrom(dialogRoot);
            })
            
        });
        const noteBtn = document.querySelector("#new-note")! as HTMLButtonElement;
        noteBtn.addEventListener("click", ()=> {
            const diablog = new InputDialog();
            const mediaInput = new TextInput();
            
            diablog.addChild(mediaInput);
            diablog.attachTo(dialogRoot);
            
            diablog.setOnCloseListener(()=> {
                diablog.removeFrom(dialogRoot);
            });
            
            diablog.setOnSubmitListener(()=> {
                const note = new NoteComponent(mediaInput.title, mediaInput.body);
                this.page.addChild(note);
                diablog.removeFrom(dialogRoot);
            })
        });

        const taskBtn = document.querySelector("#new-task")! as HTMLButtonElement;
        taskBtn.addEventListener("click", ()=> {
            const diablog = new InputDialog();
            const mediaInput = new TextInput();
            
            diablog.addChild(mediaInput);
            diablog.attachTo(dialogRoot);
            
            diablog.setOnCloseListener(()=> {
                diablog.removeFrom(dialogRoot);
            });
            
            diablog.setOnSubmitListener(()=> {
                const task = new TodoComponent(mediaInput.title, mediaInput.body);
                this.page.addChild(task);
                diablog.removeFrom(dialogRoot);
            })
        });

        


        this.page.attachTo(appRoot);
    }
};


new App(document.querySelector(".content_board_container")! as HTMLElement, document.body);

