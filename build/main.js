"use strict";
const btns = document.querySelectorAll(".content_button");
console.log(btns);
for (const item of btns) {
    item.addEventListener("click", start);
    function start() {
        console.log(item.nodeValue);
    }
}
