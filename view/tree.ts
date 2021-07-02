import { loadPlaylistItems } from "../api/youtube";
import { dom } from "../browser";
import { store, items } from "../domain";
import actions from "../domain/actions";

const viewItem = (item: Item) => {
  const { children, id, title } = item;
  const appendItems = () => elem.appendChild(renderTree(id));

  const assignLoadingState = () => {
    titleElem.textContent = title + " (loading...)";
  };

  const commands: ItemCommands = {
    select: () => (titleElem.style.fontWeight = "bold"),
    unselect: () => titleElem.style.removeProperty("font-weight"),
    startLoading: () => {
      assignLoadingState();
      loadPlaylistItems().then((itemChildren) =>
        store.apply(actions.itemsLoaded(store.state, item.id, itemChildren))
      );
    },
    stopLoading() {
      titleElem.textContent = title;
      if (items.isOpen(store.state.items, item.id)) appendItems();
    },
    close: () => dom.setChildren(elem, [titleElem]),
    open: appendItems,
  };

  const titleElem = dom.span({ text: title });
  const elem = dom.li({ children: [titleElem], id: id });

  if (id == store.state.selectedItem) commands.select();
  if (items.isLoading(store.state.items, id)) assignLoadingState();
  if (items.isOpen(store.state.items, id)) appendItems();

  store.registerView(elem, commands);
  return elem;
};

export const renderTree = (id?: string) => {
  const children = id
    ? items.mapChildrenIfOpen(store.state.items, id, viewItem)
    : items.mapRootItems(store.state.items, viewItem);

  return dom.ul({ children });
};
