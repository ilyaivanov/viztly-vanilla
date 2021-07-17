import { anim, dom, style } from "../browser";
import { levels, spacings } from "../designSystem";
import { glue, store } from "../infra";
import { ItemIcon } from "./itemIcon";

export class ItemView {
  el: HTMLDivElement;
  title: HTMLDivElement;
  titleText: HTMLSpanElement;
  childrenContainer: HTMLElement | undefined;
  icon: ItemIcon;
  constructor(public item: Item, public level: number) {
    const { title, id } = item;
    this.icon = new ItemIcon(item, {
      onMouseDown: (e) => store.onMouseDown(this.item),
    });
    this.titleText = dom.span({ className: "item-row-title", text: title });
    this.title = dom.div({
      children: [this.icon.el, this.titleText],
      classNames: ["item-row", levels.rowForLevel(level)],
      classMap: { "item-row-container": store.isContainer(item) },
      onClick: () => store.select(item.id),
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

  remove = (fireanimation?: boolean) => {
    if (fireanimation)
      anim.flyAwayAndCollapse(this.el).addEventListener("finish", () => {
        this.el.remove();
      });
    else this.el.remove();
  };

  insertAfter = (item: Item) =>
    dom.insert(this.el, "afterend", ItemView.view(item, this.level));

  insertBefore = (item: Item) =>
    dom.insert(this.el, "beforebegin", ItemView.view(item, this.level));

  insertInside = (item: Item) => {
    if (this.childrenContainer)
      dom.insert(this.el, "afterbegin", ItemView.view(item, this.level + 1));
  };

  renameInput?: HTMLInputElement;
  startRename = () => {
    if (!this.renameInput) {
      this.titleText.remove();
      this.renameInput = dom.input({
        value: this.item.title,
        className: "item-titleInput",
        onKeyDown: (e) => {
          if (
            e.code === "Enter" ||
            e.code === "Escape" ||
            e.code == "ArrowDown" ||
            e.code == "ArrowUp"
          ) {
            this.finishRename();
            //prevent item creation
            if (e.code === "Enter") e.stopPropagation();
          }
        },
      });
      this.title.appendChild(this.renameInput);
      this.renameInput.focus();
    } else {
      //TODO: this is a temporary hack. I need to make sure input is being removed when I select something else
      this.renameInput.focus();
    }
  };

  finishRename = () => {
    if (this.renameInput) {
      this.item.title = this.renameInput.value;
      this.renameInput.remove();
      this.titleText.textContent = this.item.title;
      this.title.appendChild(this.titleText);
      this.renameInput = undefined;
    }
  };

  itemLoaded = () => this.crossFadeIntoLoaded();

  startListeningToMouseOverEvents = () =>
    this.title.addEventListener("mousemove", this.onMouseOver);

  stopListeningToMouseOverEvents = () =>
    this.title.removeEventListener("mousemove", this.onMouseOver);

  onMouseOver = (e: MouseEvent) => store.onMouseOverDuringDrag(this.item, e);

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
  static view = (item: Item, level: number): HTMLDivElement =>
    new ItemView(item, level).el;
}

export const viewTree = (id: string) =>
  dom.fragment(store.mapChildren(id, (item) => ItemView.view(item, 0)));

style.class("item-row", {
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  color: "#DDDDDD",
  paddingTop: spacings.rowVecticalPadding,
  paddingBottom: spacings.rowVecticalPadding,
  onHover: {
    backgroundColor: "rgb(42,45,46)",
  },
});

style.class2("item-row", "item-row_selected", {
  backgroundColor: "#37373D",
});
style.class("item-row-title", {
  marginBottom: 2,
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

style.class("item-titleInput", { width: "100%" });
