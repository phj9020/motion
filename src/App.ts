
import { ImageComponent } from "./component/page/item/image.js";
import { NoteComponent } from "./component/page/item/note.js";
import { TodoComponent } from "./component/page/item/todo.js";
import { VideoComponent } from "./component/page/item/video.js";
import { PageComponent } from "./component/page/page.js";


class App {
    private readonly page: PageComponent;
    constructor(appRoot: HTMLElement) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot);
        
        const image = new ImageComponent('image Title', "https://picsum.photos/550/300")
        image.attachTo(appRoot, 'beforeend');

        const note = new NoteComponent("note title", "this is body paragraphasdsadasdasd");
        note.attachTo(appRoot,  'beforeend');

        const todo = new TodoComponent('Todo Title', 'Todo Item');
        todo.attachTo(appRoot, 'beforeend');

        const video = new VideoComponent("Video title", "https://youtu.be/8QKPLYpObd8")
        video.attachTo(appRoot, 'beforeend')
    }
};


new App(document.querySelector(".content_board_container")! as HTMLElement)

// const btns = document.querySelectorAll<HTMLElement>(".content_button");


// for(const item of btns) {
//     item.addEventListener("click", selectType);

//     function selectType() {
//         console.log(item.innerHTML);
    
//     }
// }

