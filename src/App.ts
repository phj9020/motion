import { Component } from "./component/component.js";
import { InputDialog, MediaData, TextData } from "./component/dialog/dialog.js";
import { MediaInput } from "./component/dialog/input/media-input.js";
import { TextInput } from "./component/dialog/input/text-input.js";
import { ImageComponent } from "./component/page/item/image.js";
import { NoteComponent } from "./component/page/item/note.js";
import { TodoComponent } from "./component/page/item/todo.js";
import { VideoComponent } from "./component/page/item/video.js";
import { Composable, PageComponent, PageItemComponent } from "./component/page/page.js";

type InputComponentConstructor<T extends (MediaData | TextData) & Component> = {
    new(): T;
}

class App {
    private readonly page: Component & Composable;
    constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
        this.page = new PageComponent(PageItemComponent);
        
        this.bindElementToDialog<MediaInput>("#new-image", MediaInput, (input: MediaInput) => new ImageComponent(input.title, input.url));

        this.bindElementToDialog<MediaInput>("#new-video", MediaInput, (input: MediaInput) => new VideoComponent(input.title, input.url));
        
        this.bindElementToDialog<TextInput>("#new-note", TextInput, (input: TextInput) => new NoteComponent(input.title, input.body));
        
        this.bindElementToDialog<TextInput>("#new-task", TextInput, (input: TextInput) => new TodoComponent(input.title, input.body));

        this.page.attachTo(appRoot);
    }

    private bindElementToDialog<T extends (MediaData | TextData) & Component>(
        selector: string, 
        InputComponent: InputComponentConstructor<T>, 
        makeSection: (input: T) => Component
        ){
        const element = document.querySelector(selector)! as HTMLButtonElement;
        element.addEventListener("click", ()=> {
            const diablog = new InputDialog();
            const input = new InputComponent();
            
            diablog.addChild(input);
            diablog.attachTo(this.dialogRoot);
            
            diablog.setOnCloseListener(()=> {
                diablog.removeFrom(this.dialogRoot);
            });
            
            diablog.setOnSubmitListener(()=> {
                const content = makeSection(input);
                this.page.addChild(content);
                diablog.removeFrom(this.dialogRoot);
            })
            
        });
    }
};


new App(document.querySelector(".content_board_container")! as HTMLElement, document.body);

