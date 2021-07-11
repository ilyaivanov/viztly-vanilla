import { loadPlaylistItems } from "../api/youtube";
import { Store } from "./store";
import { ItemView } from "./view/itemsTree";
import { SearchTab } from "./view/searchTab";

export class CommandsDispatcher {
  constructor(private store: Store) {
    store.saveDispatcher(this.dispatchCommands);
  }
  itemViews: Record<string, ItemView> = {};

  saveView = (id: string, view: ItemView) => (this.itemViews[id] = view);
  removeView = (id: string) => delete this.itemViews[id];

  private dispatchCommands = (commands: ActionCommands) => {
    Object.entries(commands).forEach(([key, itemId]) => {
      const command = key as StoreEvent;
      if (command == "item-select") this.selectItem(itemId);
      if (command == "item-unselect") this.unselectItem(itemId);
      if (command == "item-open") this.open(itemId);
      if (command == "item-close") this.close(itemId);
      if (command == "item-loaded") this.itemLoaded(itemId);
      if (command == "item-start-loading") {
        loadPlaylistItems().then((items) =>
          this.store.itemsLoaded(itemId, items)
        );
      }
      if (command == "run-diagnostics") this.printEvents();

      if (command == "search-input-focus") {
        if (this.store.isSearchInputFocused()) this.focusSearchInput();
        else this.unfocusSearchInput();
      }

      if (command == "search-loading") {
        if (this.store.isSearchLoading()) this.searchTab.startLoading();
        else this.searchTab.stopLoading();
      }
    });
  };

  private printEvents = () => {
    console.log(Object.values(this.itemViews).length + " views subscribed");
  };

  //commands
  private selectItem = (id: string) => this.getView(id).select();
  private unselectItem = (id: string) => this.getView(id).unselect();
  private open = (id: string) => this.getView(id).open();
  private close = (id: string) => {
    this.getView(id).close();
    //cleanup resources
    this.store.forEachOpenChild(id, (item) => this.removeView(item.id));
  };
  private itemLoaded = (id: string) => this.getView(id).itemLoaded();

  private getView = (id: string) => this.itemViews[id];

  //searchTab
  searchTab!: SearchTab;

  private focusSearchInput = () => this.searchTab.focusInput();
  private unfocusSearchInput = () => this.searchTab.blurInput();
}
