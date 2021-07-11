
type Notion = "image" | "video" | "note" | "task";

type ArrayOfButton = HTMLElement[] | null | undefined;

// class NotionImple implements Notion {

// }

const btns = document.querySelectorAll<HTMLElement>(".content_button");
console.log(btns);

for(const item of btns) {
    item.addEventListener("click", start);

    function start() {
        console.log(item.nodeValue);
    
    }
}
