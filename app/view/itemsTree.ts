import { anim, dom, style } from "../browser";
import { levels, spacings } from "../designSystem";
import { glue, store } from "../infra";
import { ItemIcon } from "./itemIcon";

export class ItemView {
  el: HTMLDivElement;
  title: HTMLDivElement;
  childrenContainer: HTMLElement | undefined;
  icon: ItemIcon;
  constructor(private item: Item, private level = 0) {
    const { title, id } = item;
    this.icon = new ItemIcon(item);
    this.title = dom.div({
      children: [this.icon.el, dom.span({ text: title })],
      classNames: ["item-row", levels.rowForLevel(level)],
      classMap: { "item-row-container": store.isContainer(item) },
    });
    this.el = dom.div({ children: [this.title] });

    if (store.isOpen(id)) {
      this.childrenContainer = this.viewChildren();
      this.el.appendChild(this.childrenContainer);
    }
    glue.saveView(item.id, this);
  }

  select = () => {
    dom.addClass(this.title, "item-row_selected");
    this.icon.select();
  };

  unselect = () => {
    dom.removeClass(this.title, "item-row_selected");
    this.icon.unselect();
  };

  open = () => {
    if (!anim.revertAnimations(this.childrenContainer)) {
      this.childrenContainer = this.viewChildren();
      this.el.appendChild(this.childrenContainer);
      anim
        .expand(this.childrenContainer)
        .addEventListener("finish", this.onChildrenAnimationDone);
    }
    this.icon.open();
  };

  close = () => {
    const childEl = this.childrenContainer;
    if (!anim.revertAnimations(childEl) && childEl)
      anim
        .collapse(childEl)
        .addEventListener("finish", this.onChildrenAnimationDone);

    this.icon.close();
  };

  itemLoaded = () => this.crossFadeIntoLoaded();

  private crossFadeIntoLoaded = () => {
    if (store.isOpen(this.item.id)) {
      const newContent = this.viewChildren();
      const container = this.childrenContainer;
      if (container)
        anim.crossFade(
          container,
          container.firstChild as HTMLElement, //loading label
          newContent
        );
    }
  };
  private onChildrenAnimationDone = () => {
    if (this.childrenContainer && !store.isOpen(this.item.id)) {
      this.childrenContainer.remove();
      this.childrenContainer = undefined;
    }
  };

  private viewChildren = () => {
    const res = dom.div({ className: "item-row-children" });
    if (!store.isLoading(this.item.id)) {
      dom.setChildren(
        res,
        store
          .mapChildren(this.item.id, (item) =>
            ItemView.view(item, this.level + 1)
          )
          .concat(this.viewBorder())
      );
    } else
      res.appendChild(
        dom.span({
          text: "Loading...",
          className: levels.rowForLevel(this.level + 1),
        })
      );
    return res;
  };

  private viewBorder = () =>
    dom.div({
      classNames: [
        "item-children-border",
        levels.childrenBorderForLevel(this.level),
      ],
    });
  static view = (item: Item, level = 0): HTMLDivElement =>
    new ItemView(item, level).el;
}

export const viewTree = (id: string) =>
  dom.fragment(store.mapChildren(id, (item) => ItemView.view(item)));

style.class("item-row_selected", {
  backgroundColor: "#37373D",
});

style.class("item-row", {
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  color: "#DDDDDD",
  paddingTop: spacings.rowVecticalPadding,
  paddingBottom: spacings.rowVecticalPadding,
});

style.class("item-row-container", { fontWeight: "bold" });

style.class("item-row-children", {
  overflow: "hidden",
  position: "relative",
});
style.class("item-children-border", {
  position: "absolute",
  width: 2,
  top: 0,
  bottom: 0,
  backgroundColor: "#4C5155",
});
