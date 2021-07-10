import { dom, anim, style } from "../browser";
import { store } from "../domain";

const viewItem = (item: Item) => {
  const { id, title } = item;
  let childrenContainer: HTMLElement | undefined;
  const viewChildren = () => {
    const res = document.createElement("div");
    res.style.overflow = "hidden";
    if (!store.isLoading(item.id)) {
      dom.setChildren(res, [renderTree(id)]);
    } else res.appendChild(dom.span({ text: "Loading..." }));
    return res;
  };

  const crossFadeIntoLoaded = () => {
    if (store.isOpen(item.id)) {
      const newContent = viewChildren();
      if (childrenContainer)
        anim.crossFade(
          childrenContainer,
          childrenContainer.firstChild as HTMLElement,
          newContent
        );
    }
  };
  store.onKeyed("item-loaded", item.id, crossFadeIntoLoaded);
  store.onKeyed("item-select", item.id, () => {
    console.log("item select");
    dom.addClass(titleElem, "item-title_selected");
  });
  store.onKeyed("item-unselect", item.id, () =>
    dom.removeClass(titleElem, "item-title_selected")
  );

  store.onKeyed("item-open", item.id, () => {
    if (!anim.revertAnimations(childrenContainer)) {
      childrenContainer = viewChildren();
      elem.appendChild(childrenContainer);
      anim
        .expand(childrenContainer)
        .addEventListener("finish", onChildrenAnimationDone);
    }
  });
  store.onKeyed("item-close", item.id, () => {
    if (!anim.revertAnimations(childrenContainer) && childrenContainer)
      anim
        .collapse(childrenContainer)
        .addEventListener("finish", onChildrenAnimationDone);
  });

  const onChildrenAnimationDone = () => {
    if (childrenContainer && !store.isOpen(item.id)) {
      childrenContainer.remove();
      childrenContainer = undefined;
    }
  };

  const titleElem = dom.span({ text: title });
  const elem = dom.li({ children: [titleElem], id: id });

  if (store.isOpen(id)) {
    childrenContainer = viewChildren();
    elem.appendChild(childrenContainer);
  }

  return elem;
};

export const renderTree = (id?: string) => {
  const children = id
    ? store.mapChildrenIfOpen(id, viewItem)
    : store.mapRootItems(viewItem);

  return dom.ul({ children });
};

style.class("item-title_selected", {
  color: "#9CDCFE",
  fontWeight: "bold",
});
