import { dom, style } from "../browser";
import { glue } from "../infra";
import * as youtubePlayer from "../api/youtubePlayer";

export class Player {
  el: HTMLElement;

  constructor() {
    glue.player = this;
    this.el = dom.div({
      className: "player",
      children: [
        dom.div({
          id: youtubePlayer.youtubeIframe,
        }),
      ],
    });
  }

  play(item: Item) {
    if (item.type === "YTvideo") youtubePlayer.play(item.videoId);
  }
}

style.id(youtubePlayer.youtubeIframe, {
  position: "absolute",
  bottom: 50,
  right: 10,
  width: 300,
  height: 240,
});
