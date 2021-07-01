import { dom } from "../browser";
import { store, items } from "../domain";

const viewItem = (item: Item) => {
  const { children, id, title } = item;
  const appendItems = () => {
    if (children) elem.appendChild(renderTree(id));
  };

  const commands: ItemCommands = {
    select: () => (titleElem.style.fontWeight = "bold"),
    unselect: () => titleElem.style.removeProperty("font-weight"),
    startLoading: () => (titleElem.textContent = title + " (loading...)"),
    stopLoading() {
      titleElem.textContent = title;
      appendItems();
    },
    close: () => dom.setChildren(elem, [titleElem]),
    open: appendItems,
  };

  const titleElem = dom.span({ text: title });
  const elem = dom.li({
    children: [titleElem].concat(renderTree(id)),
    id: id,
  });

  if (id == store.state.selectedItem) commands.select();
  store.registerView(elem, commands);
  return elem;
};

export const renderTree = (id?: string) => {
  const children = id
    ? items.mapChildrenIfOpen(store.state.items, id, viewItem)
    : items.mapRootItems(store.state.items, viewItem);

  return dom.ul({ children });
};
