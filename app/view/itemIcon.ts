import { css, dom, style, svg } from "../browser";
import { icons, spacings, timings } from "../designSystem";
import { store } from "../infra";

const iconSize = spacings.outerRadius * 2;

export class ItemIcon {
  el: Node;

  outerCircle: SVGElement;
  chevron: SVGElement;
  constructor(private item: Item) {
    this.outerCircle = svg.circle({
      cx: iconSize / 2,
      cy: iconSize / 2,
      r: spacings.outerRadius,
      fill: "rgba(255,255,255,0.3)",
      className: "item-icon-circle",
      classMap: this.openCircleMap(),
    });
    this.chevron = icons.chevron({
      className: "item-icon-chevron",
      classMap: { "item-icon-chevron_open": store.isOpen(this.item.id) },
    });

    this.el = dom.fragment([
      this.chevron,
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

  open = () => {
    dom.assignClasses(this.outerCircle, { classMap: this.openCircleMap() });
    dom.addClass(this.chevron, "item-icon-chevron_open");
  };
  close = () => {
    dom.assignClasses(this.outerCircle, { classMap: this.openCircleMap() });
    dom.removeClass(this.chevron, "item-icon-chevron_open");
  };

  select = () => dom.addClass(this.chevron, "item-icon-chevron_visible");

  unselect = () => dom.removeClass(this.chevron, "item-icon-chevron_visible");

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
  transition: css.transition({ opacity: timings.itemCollapse }),
});

style.class("item-icon-circle_hidden", { opacity: 0 });

style.class("item-icon-chevron", {
  height: spacings.chevronSize,
  width: spacings.chevronSize,
  borderRadius: spacings.chevronSize,
  //   marginTop: spacings.imageSize / 2 - spacings.chevronSize / 2,
  minWidth: spacings.chevronSize,
  color: "#B8BCBF",
  opacity: 0,
  userSelect: "none",
  pointerEvents: "none",
  onHover: { color: "currentColor" },
  transition: css.transition({ transform: timings.itemCollapse }),
});

style.class("item-icon-chevron_open", {
  transform: "rotateZ(90deg)",
});

style.class("item-icon-chevron_visible", {
  opacity: 1,
  pointerEvents: "all",
});
