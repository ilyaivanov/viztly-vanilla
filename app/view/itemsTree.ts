import { anim, dom, style } from "../browser";
import { glue, store } from "../infra";

export class ItemView {
  el: HTMLLIElement;
  title: HTMLSpanElement;
  childrenContainer: HTMLElement | undefined;

  constructor(private item: Item) {
    const { title, id } = item;
    this.title = dom.span({ text: title });
    this.el = dom.li({ children: [this.title], id: id });

    if (store.isOpen(id)) {
      this.childrenContainer = this.viewChildren();
      this.el.appendChild(this.childrenContainer);
    }
    glue.saveView(item.id, this);
  }

  select = () => dom.addClass(this.title, "item-title_selected");
  unselect = () => dom.removeClass(this.title, "item-title_selected");

  open = () => {
    if (!anim.revertAnimations(this.childrenContainer)) {
      this.childrenContainer = this.viewChildren();
      this.el.appendChild(this.childrenContainer);
      anim
        .expand(this.childrenContainer)
        .addEventListener("finish", this.onChildrenAnimationDone);
    }
  };

  close = () => {
    const childEl = this.childrenContainer;
    if (!anim.revertAnimations(childEl) && childEl)
      anim
        .collapse(childEl)
        .addEventListener("finish", this.onChildrenAnimationDone);
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
    const res = document.createElement("div");
    res.style.overflow = "hidden";
    if (!store.isLoading(this.item.id)) {
      dom.setChildren(res, [viewTree(this.item.id)]);
    } else res.appendChild(dom.span({ text: "Loading..." }));
    return res;
  };

  static view = (item: Item): HTMLLIElement => new ItemView(item).el;
}

export const viewTree = (id: string) =>
  dom.ul({ children: store.mapChildren(id, ItemView.view) });

style.class("item-title_selected", {
  fontWeight: "bold",
  color: "#9CDCFE",
});
