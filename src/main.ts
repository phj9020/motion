import { PageComponent } from "./component/page.js";


class App {
    private readonly page: PageComponent;
    constructor(appRoot: HTMLElement) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot);
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

