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

  private dispatchCommands = (events: DomainEvent[]) => {
    events.forEach((event) => {
      if (event.type == "item-select") this.selectItem(event.payload);
      if (event.type == "item-open") this.open(event.payload);
      if (event.type == "item-close") this.close(event.payload);
      if (event.type == "item-loaded") this.itemLoaded(event.payload);
      if (event.type == "item-start-loading") {
        loadPlaylistItems().then((items) =>
          this.store.itemsLoaded(event.payload, items)
        );
      }
      if (event.type == "search-find-videos") {
        const term = event.payload;
        findVideos(term).then(this.store.searchDone);
      }
      if (event.type == "run-diagnostics") this.printEvents();

      if (event.type == "search-loading") {
        if (this.store.isSearchLoading()) {
          this.cleanupAllSubviews("SEARCH");
          this.searchTab.startLoading();
        } else this.searchTab.stopLoading();
      }

      if (event.type == "search-tab-visibility-change") {
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

  private cleanupAllSubviews = (itemId: string) =>
    this.store.forEachOpenChild(itemId, (item) => this.removeView(item.id));
}
