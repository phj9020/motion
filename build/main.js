import { PageComponent } from "./component/page.js";
class App {
    constructor(appRoot) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot);
    }
}
;
new App(document.querySelector(".content_board_container"));
