import { dom } from "./browser";
import { store } from "./domain";
import { getRootItems } from "./domain/items";

document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowDown") store.selectNextItem();
  if (e.code === "ArrowUp") store.selectPreviousItem();
});

//view
const viewItem = (item: Item) => {
  const commands: ItemCommands = {
    select: () => (elem.style.fontWeight = "bold"),
    unselect: () => elem.style.removeProperty("font-weight"),
  };
  const elem = dom.li({
    text: item.title,
    id: item.id,
  });
  if (item.id == store.selectedItemId) commands.select();
  store.registerView(elem, commands);
  return elem;
};

const app = dom.ol({ children: getRootItems(store.items).map(viewItem) });

//main
document.body.append(app);
