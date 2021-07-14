import { BaseComponent, Component } from '../component.js';

// 여러가지를 모아서 조립하는 Composable
export interface Composable {
    addChild(child: Component) : void;
}

type onCloseListener = ()=> void;
type DragState = "start" | "stop" | "enter" | "leave";
type onDragListener<T extends Component> = (target : T, state: DragState)=> void;

interface SectionContainer extends Component, Composable {
    setOnCloseListener(listener: onCloseListener): void;
    setOnDragStateListener(listener:onDragListener<SectionContainer>) : void;
    muteChildren(state: 'mute' | 'unmute'): void;
    getBoundingRect() : DOMRect;
    onDropped(): void;
}

type SectionContainerConstructor = {
    new(): SectionContainer;
}

export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer {
    private closeListener?: onCloseListener;
    private dragListener?: onDragListener<PageItemComponent>;
    constructor() {
        super(`
            <li draggable="true" class="page-item">
                <div class="content_delete_container">
                    <button class="content_delete_btn">X</button>
                </div>
            </li>
        `);
        const closeButton = this.element.querySelector(".content_delete_btn")! as HTMLButtonElement;
        closeButton.onclick = () => {
            this.closeListener && this.closeListener();
        };

        this.element.addEventListener("dragstart", (event:DragEvent) => {
            this.onDragStart(event)
        })
        this.element.addEventListener("dragend", (event:DragEvent) => {
            this.onDragEnd(event)
        })
        this.element.addEventListener("dragenter", (event:DragEvent) => {
            this.onDragEnter(event)
        })
        this.element.addEventListener("dragleave", (event:DragEvent) => {
            this.onDragLeave(event)
        })

    }
    addChild(child: Component){
        // const container = this.element.querySelector(".page-item__body")! as HTMLElement;
        child.attachTo(this.element);
    }
    setOnCloseListener(listener: onCloseListener){
        this.closeListener = listener;
    }

    onDragStart(_ : DragEvent){
        this.notifyDragObservers('start');
        this.element.classList.add("lifted");
    }
    onDragEnd(_ : DragEvent){
        this.notifyDragObservers('stop');
        this.element.classList.remove("lifted");
    }
    onDragEnter(_ : DragEvent){
        this.notifyDragObservers('enter');
        this.element.classList.add("drop-area");
    }
    onDragLeave(_ : DragEvent){
        this.notifyDragObservers('leave');
        this.element.classList.remove("drop-area");
    }

    notifyDragObservers(state:DragState){
        this.dragListener && this.dragListener(this, state);
    }
    
    setOnDragStateListener(listener:onDragListener<PageItemComponent>){
        this.dragListener = listener;
    }
    muteChildren(state: 'mute' | 'unmute') {
        if (state === 'mute') {
            this.element.classList.add('mute-children');
        } else {
            this.element.classList.remove('mute-children');
        }
    }
    getBoundingRect() : DOMRect {
        return this.element.getBoundingClientRect();
    }
    onDropped() {
        this.element.classList.remove("drop-area");
    }
}


export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable{
    //save state
    // children : set all li 
    private children = new Set<SectionContainer>();
    private dragTarget?: SectionContainer;
    private dropTarget?: SectionContainer;

    constructor(private pageItemContructor: SectionContainerConstructor) {
        super(`
            <ul class="page"></ul>
        `
        );
        this.element.addEventListener("dragover", (event: DragEvent) => {
            this.onDragOver(event);
        });
        this.element.addEventListener("drop", (event: DragEvent) => {
            this.onDrop(event);
        });
    }
    
    addChild(section: Component) {
        const item = new this.pageItemContructor();
        item.addChild(section);
        item.attachTo(this.element, 'beforeend');
        item.setOnCloseListener(()=> {
            item.removeFrom(this.element);
            this.children.delete(item);
        });
        this.children.add(item);

        // start와 stop에서는 dragTarget을 업데이트 enter와 leave는 dropTarget을 업데이트 
        item.setOnDragStateListener((target : SectionContainer, state: DragState) => {
            switch(state) {
                case 'start':
                    this.dragTarget = target;
                    this.updateSections('mute');
                    break;
                case 'stop':
                    this.dragTarget = undefined;
                    this.updateSections('unmute');
                    break;
                case 'enter':
                    console.log('enter', target)
                    this.dropTarget = target;
                    break;
                    case 'leave':
                    console.log('leave', target)
                    this.dropTarget = undefined;
                    break;
                default:
                    throw new Error(`unsupported state: ${state}`);
            }
        })
    }
    
    onDragOver(event: DragEvent){
        event.preventDefault();
        console.log("dragover", event)
    }

    onDrop(event: DragEvent) {
        event.preventDefault();
        console.log("drop");
        // 여기에서 위치를 바꿈
        // 드롭타겟이 없다면 아무런 행동하지 않음 
        if(!this.dropTarget) {
            return;
        }
        // 드래그타겟이 있고 현재 드래그타겟과 드롭타겟이 일치하지 않는다면 위치를 바꾸자 
        if(this.dragTarget && this.dragTarget !== this.dropTarget) {
            const dropY = event.clientY;
            const srcElement = this.dragTarget.getBoundingRect();
            console.log(srcElement)
            console.log("drop.Y", dropY)

            this.dragTarget?.removeFrom(this.element);
            this.dropTarget.attach(this.dragTarget, dropY < srcElement.y ? "beforebegin" : "afterend");
        }

        // "drop-area" remove 알려주자 
        this.dropTarget.onDropped();
    }

    private updateSections(state: 'mute' | 'unmute') {
        this.children.forEach((section: SectionContainer) => {
            section.muteChildren(state);
        })
    }
}