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
  bottom: 69,
  right: 20,
  width: 400,
  height: 150,
});

style.class("player", {
  position: "fixed",
  bottom: 0,
  height: 49,
  left: 0,
  right: 0,
  backgroundColor: "#252526",
  boxShadow: "0px 0px 6px 0px black",
});
