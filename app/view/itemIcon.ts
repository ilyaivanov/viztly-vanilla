import { css, dom, style, svg } from "../browser";
import { icons, spacings, timings } from "../designSystem";
import { store } from "../infra";

const iconSize = spacings.outerRadius * 2;

export class ItemIcon {
  el: Node;

  outerCircle: SVGElement;
  innerCircle: SVGElement;

  chevron: SVGElement;
  constructor(private item: Item, props?: { onMouseDown: Action<MouseEvent> }) {
    this.outerCircle = svg.circle({
      cx: iconSize / 2,
      cy: iconSize / 2,
      r: spacings.outerRadius,
      fill: "rgba(255,255,255,0.3)",
      className: "item-icon-circle",
      classMap: this.openCircleMap(),
    });
    this.innerCircle = svg.circle({
      cx: iconSize / 2,
      cy: iconSize / 2,
      r: spacings.innerRadius,
      fill: "white",
    });
    this.chevron = icons.chevron({
      className: "item-icon-chevron",
      classMap: {
        "item-icon-chevron_open": store.isOpen(this.item.id),
        "item-icon-chevron_active": this.canBeOpen(),
      },
      onClick: () => store.toggle(item.id),
    });

    const itemIconContainer = svg.svg({
      className: "item-icon-svg",
      viewBox: `0 0 ${iconSize} ${iconSize}`,
      onMouseDown: props?.onMouseDown,
    });

    if (store.hasImage(item.id)) {
      const imageUrl = `url(${store.getPreviewImage(item.id)})`;
      itemIconContainer.style.backgroundImage = imageUrl;
      dom.assignClasses(itemIconContainer, {
        classMap: {
          "item-icon-image_square":
            store.isPlaylist(item) || store.isVideo(item),
          "item-icon-image_circle": store.isChannel(item),
        },
      });
    } else {
      dom.appendChildren(itemIconContainer, [
        this.innerCircle,
        this.outerCircle,
      ]);
    }

    this.el = dom.fragment([this.chevron, itemIconContainer]);
  }

  open = () => {
    dom.assignClasses(this.outerCircle, { classMap: this.openCircleMap() });
    dom.addClass(this.chevron, "item-icon-chevron_open");
  };
  close = () => {
    dom.assignClasses(this.outerCircle, { classMap: this.openCircleMap() });
    dom.removeClass(this.chevron, "item-icon-chevron_open");
  };

  select = () => {
    if (this.canBeOpen())
      dom.addClass(this.chevron, "item-icon-chevron_visible");
  };

  canBeOpen = () =>
    !store.isEmpty(this.item) || store.isNeededToBeLoaded(this.item);

  unselect = () => dom.removeClass(this.chevron, "item-icon-chevron_visible");

  openCircleMap = (): dom.ClassMap => ({
    "item-icon-circle_hidden": store.isOpen(this.item.id),
  });
}

style.class("item-icon-svg", {
  width: iconSize,
  minWidth: iconSize,
  height: iconSize,
  marginRight: spacings.spaceBetweenCircleAndText,
  backgroundSize: "cover",
  backgroundPosition: `50% 50%`,
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
  transition: css.transition({
    transform: timings.itemCollapse,
    opacity: timings.itemCollapse,
  }),
});

style.class("item-icon-chevron_open", {
  transform: "rotateZ(90deg)",
});

style.class("item-icon-chevron_visible", {
  opacity: 1,
  pointerEvents: "all",
});

style.parentHover("item-row", "item-icon-chevron_active", {
  opacity: 1,
  pointerEvents: "all",
});

const inset = (spread: number, color: string) =>
  `inset 0 0 0 ${spread}px ${color}`;

style.class("item-icon-image_circle", {
  borderRadius: "50%",
  boxShadow: inset(2, "rgba(255,255,255,0.15)"),
});

style.class("item-icon-image_square", {
  borderRadius: 4,
  boxShadow: inset(2, "rgba(255,255,255,0.15)"),
});
