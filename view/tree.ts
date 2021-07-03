import { loadPlaylistItems } from "../api/youtube";
import { dom, anim, style } from "../browser";
import { store, items } from "../domain";
import actions from "../domain/actions";

const viewItem = (item: Item) => {
  const { id, title } = item;
  let childrenContainer: HTMLElement;
  const viewChildren = () => {
    const res = document.createElement("div");
    res.style.overflow = "hidden";
    if (!items.isLoading(store.state.items, item.id)) {
      dom.setChildren(res, [renderTree(id)]);
    } else res.appendChild(dom.span({ text: "Loading..." }));
    return res;
  };

  const commands: ItemCommands = {
    select: () => dom.addClass(titleElem, "item-title_selected"),
    unselect: () => dom.removeClass(titleElem, "item-title_selected"),
    startLoading: () => {
      loadPlaylistItems().then((itemChildren) =>
        store.apply(actions.itemsLoaded(store.state, item.id, itemChildren))
      );
    },
    stopLoading() {
      if (items.isOpen(store.state.items, item.id)) {
        const newContent = viewChildren();
        anim.crossFade(
          childrenContainer,
          childrenContainer.firstChild as HTMLElement,
          newContent
        );
      }
    },
    close: () =>
      anim
        .collapse(childrenContainer)
        .addEventListener("finish", () => childrenContainer.remove()),
    open: () => {
      childrenContainer = viewChildren();
      elem.appendChild(childrenContainer);
      anim.expand(childrenContainer);
    },
  };

  const titleElem = dom.span({ text: title });
  const elem = dom.li({ children: [titleElem], id: id });

  if (
    id == store.state.mainSelectedItem ||
    id == store.state.searchSelectedItem
  )
    commands.select();
  if (items.isOpen(store.state.items, id)) {
    childrenContainer = viewChildren();
    elem.appendChild(childrenContainer);
  }

  store.registerView(elem, commands);
  return elem;
};

export const renderTree = (id?: string) => {
  const children = id
    ? items.mapChildrenIfOpen(store.state.items, id, viewItem)
    : items.mapRootItems(store.state.items, viewItem);

  return dom.ul({ children });
};

style.class("item-title_selected", {
  color: "#9CDCFE",
  fontWeight: "bold",
});
