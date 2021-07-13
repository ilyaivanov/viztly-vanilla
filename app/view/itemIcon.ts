import { anim, dom, style, svg } from "../browser";
import { spacings } from "../designSystem";
import { store } from "../infra";

const iconSize = spacings.outerRadius * 2;

export class ItemIcon {
  el: Node;

  outerCircle: SVGElement;

  constructor(private item: Item) {
    this.outerCircle = svg.circle({
      cx: iconSize / 2,
      cy: iconSize / 2,
      r: spacings.outerRadius,
      fill: "rgba(255,255,255,0.3)",
      className: "item-icon-circle",
      classMap: this.openCircleMap(),
    });
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
          this.outerCircle,
        ],
      }),
    ]);
  }

  open = () =>
    dom.assignClasses(this.outerCircle, { classMap: this.openCircleMap() });
  close = () =>
    dom.assignClasses(this.outerCircle, { classMap: this.openCircleMap() });

  openCircleMap = (): dom.ClassMap => ({
    "item-icon-circle_hidden": store.isOpen(this.item.id),
  });
}

style.class("item-icon-svg", {
  width: iconSize,
  height: iconSize,
  marginRight: spacings.spaceBetweenCircleAndText,
});

style.class("item-icon-circle", {
  transition: "opacity 200ms",
});
style.class("item-icon-circle_hidden", {
  opacity: 0,
});
