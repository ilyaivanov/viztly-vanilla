import { findVideos, loadPlaylistItems } from "../api/youtube";
import { Store } from "../domain/store";
import { ItemView } from "../view/itemsTree";
import { SearchTab } from "../view/searchTab";

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
      if (command == "item-open") this.open(itemId);
      if (command == "item-close") this.close(itemId);
      if (command == "item-loaded") this.itemLoaded(itemId);
      if (command == "item-start-loading") {
        loadPlaylistItems().then((items) =>
          this.store.itemsLoaded(itemId, items)
        );
      }
      if (command == "search-find-videos") {
        //TODO: this is ugly. payload currently is string and it just happened that this workds for now
        //I need to extends commands to be able to dispatch objects with type and payload
        const term = itemId;
        findVideos(term).then(this.store.searchDone);
      }
      if (command == "run-diagnostics") this.printEvents();

      if (command == "search-loading") {
        if (this.store.isSearchLoading()) {
          //TODO: cleanupAllSubviews doesn't work: items are already removed from state
          //I need to dispatch this comamnd before state update
          this.cleanupAllSubviews("SEARCH");
          this.searchTab.startLoading();
        } else this.searchTab.stopLoading();
      }

      if (command == "search-tab-visibility-change") {
        if (this.store.isSearchVisible()) this.searchTab.show();
        else this.searchTab.hide();
      }
    });
  };

  private printEvents = () => {
    console.log(Object.values(this.itemViews).length + " views subscribed");
  };

  //commands
  private itemSelected: string | undefined;
  private selectItem = (id: string) => {
    if (this.itemSelected) this.unselect(this.itemSelected);
    this.itemSelected = id;
    this.select(this.itemSelected);
  };

  private select = (id: string) => {
    if (id === "search-input") this.searchTab.focusInput();
    else this.getView(id)?.select();
  };

  private unselect = (id: string) => {
    if (id === "search-input") this.searchTab.blurInput();
    else this.getView(id)?.unselect();
  };

  private open = (id: string) => this.getView(id).open();
  private close = (id: string) => {
    this.getView(id).close();
    this.cleanupAllSubviews(id);
  };
  private itemLoaded = (id: string) => this.getView(id).itemLoaded();

  private getView = (id: string) => this.itemViews[id];

  //searchTab
  searchTab!: SearchTab;

  private focusSearchInput = () => this.searchTab.focusInput();
  private unfocusSearchInput = () => this.searchTab.blurInput();

  private cleanupAllSubviews = (itemId: string) =>
    this.store.forEachOpenChild(itemId, (item) => this.removeView(item.id));
}
