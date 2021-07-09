import { style } from "../browser";
import { store } from "./store";
import * as dom from "./browser";

const tree = () => {
  const renderChildren = () =>
    store.state.items.map((item) =>
      dom.li({
        text: item.title,
        onClick: () => store.itemClicked(item.id),
      })
    );
  return dom.ul({
    children: renderChildren(),
    commands: {
      itemsVisibilityChanged: (el) =>
        store.q.isVisible()
          ? dom.appendAll(el, renderChildren())
          : dom.removeAllChildren(el),
    },
  });
};

const hideButton = () =>
  dom.button({
    text: "hide",
    onClick: store.toggleItems,
    commands: {
      itemsVisibilityChanged: (el) =>
        (el.textContent = store.q.isVisible() ? "hide" : "show"),
    },
  });

document.addEventListener("keydown", (e) => {
  if (e.key == "b" && e.ctrlKey) {
    console.log(store.events);
  }
});

document.body.appendChild(tree());
document.body.appendChild(hideButton());

style.class("item-done", {
  fontWeight: "bold",
});
