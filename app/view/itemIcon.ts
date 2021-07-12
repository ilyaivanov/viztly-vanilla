import { dom, style, svg } from "../browser";
import { spacings } from "../designSystem";

const iconSize = spacings.outerRadius * 2;

export class ItemIcon {
  el: Node;

  constructor() {
    this.el = dom.fragment([
      svg.svg({
        className: "item-icon-svg",
        viewBox: `0 0 ${iconSize} ${iconSize}`,
        children: [
          svg.circle({
            cx: iconSize / 2,
            cy: iconSize / 2,
            r: spacings.innerRadius,
            fill: "white",
          }),
        ],
      }),
    ]);
  }
}

style.class("item-icon-svg", {
  width: iconSize,
  height: iconSize,
  marginRight: spacings.spaceBetweenCircleAndText,
});
