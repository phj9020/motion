// <iframe width="1280" height="720" src="https://www.youtube.com/embed/nD_TFOWy12s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
// <iframe width="1280" height="720" src="https://www.youtube.com/embed/8QKPLYpObd8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

import { BaseComponent } from "../../component.js";


export class VideoComponent extends BaseComponent<HTMLElement> {
    constructor(title: string, url: string) {
        super(`
            <section class="content_board--imageVideo">
                <div class="video_player">
                    <iframe class="video__iframe"></iframe>
                </div>
                <div class="content_text_container">
                    <h2 class="content_title"></h2>
                </div>
            </section>
        `)

        const videoIframe = this.element.querySelector(".video__iframe")! as HTMLIFrameElement;
        videoIframe.src = this.convertEmbeddedUrl(url) //url => videoid -> embed

        
        const contentTitle = this.element.querySelector(".content_title")! as HTMLHeadingElement;
        contentTitle.textContent = title;
    }
    
    private convertEmbeddedUrl(url : string) : string {
        const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/; 
        
        const match = url.match(regExp);
        console.log(match)
        const videoId = match? match[1] || match[2] : undefined;
        console.log(videoId);
        if(videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }
        return url;
    }
}