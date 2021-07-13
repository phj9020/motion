import { BaseComponent, Component } from "../component.js";
import { Composable } from "../page/page.js";

type onCloseListener = () => void;
type onSubmitListner = () => void;

export class InputDialog extends BaseComponent<HTMLElement> implements Composable {
    private closeListener? : onCloseListener;
    private submitListener? : onSubmitListner;
    constructor(){
        super(
            `
            <dialog class="dialog">
                <div class="dialog__container">
                    <button class="dialog__close">X</button>
                    <div id="dialog__body"></div>
                    <button class="dialog__submit">ADD</button>
                </div
            </dialog>
            `
        );

        const closeBtn =  this.element.querySelector(".dialog__close")! as HTMLButtonElement;
        closeBtn.onclick = () => {
            this.closeListener && this.closeListener();
        }
        const submitBtn = this.element.querySelector(".dialog__submit")! as HTMLButtonElement;

        submitBtn.onclick = () => {
            this.submitListener && this.submitListener();
        }
    }

    setOnCloseListener(listener: onCloseListener){
        this.closeListener = listener;
    }

    setOnSubmitListener(listener: onSubmitListner) {
        this.submitListener = listener;
    }

    addChild(child: Component){
        const body = this.element.querySelector("#dialog__body")! as HTMLElement;
        child.attachTo(body);
    }

    
}