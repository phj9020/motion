
import { ImageComponent } from "./component/page/item/image.js";
import { PageComponent } from "./component/page/page.js";


class App {
    private readonly page: PageComponent;
    constructor(appRoot: HTMLElement) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot);
        
        const image = new ImageComponent('image Title', "https://picsum.photos/550/300")
        image.attachTo(appRoot, 'beforeend');
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

