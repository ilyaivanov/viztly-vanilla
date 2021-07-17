import { findVideos, loadPlaylistItems } from "../api/youtube";
import { Store } from "../domain/store";
import Dnd from "../view/dnd";
import { ItemView } from "../view/itemsTree";
import { Player } from "../view/player";
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
      if (event.type == "item-open")
        this.itemViewAction(event.payload, (view) => view.open());

      if (event.type == "item-close")
        this.itemViewAction(event.payload, (view) => view.close());

      if (event.type == "item-removed")
        this.itemViewAction(event.payload.itemId, (view) =>
          view.remove(event.payload.fireAnimation)
        );

      if (event.type == "item-startRename")
        this.itemViewAction(event.payload, (view) => view.startRename());

      if (event.type == "item-mouse-down") {
        this.dnd.onItemMouseDown(event.payload);
        this.allViewsAction((view) => view.startListeningToMouseOverEvents());
      }
      if (event.type == "item-mouse-move-during-drag")
        this.dnd.onItemMouseMoveOver(event.payload.itemUnder, event.payload.e);
      if (event.type == "item-mouse-up-during-drag") {
        this.allViewsAction((view) => view.stopListeningToMouseOverEvents());
      }
      if (event.type == "item-insertAfter")
        this.itemViewAction(event.payload.itemId, (view) =>
          view.insertAfter(event.payload.folder)
        );
      if (event.type == "item-insertBefore")
        this.itemViewAction(event.payload.itemId, (view) =>
          view.insertBefore(event.payload.folder)
        );
      if (event.type == "item-insertInside")
        this.itemViewAction(event.payload.itemId, (view) =>
          view.insertInside(event.payload.folder)
        );
      if (event.type == "item-loaded")
        this.itemViewAction(event.payload, (view) => view.itemLoaded());
      if (event.type == "item-play") this.playItem(event.payload);
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

  private itemViewAction = (id: string, func: Action<ItemView>) =>
    func(this.getView(id));

  private allViewsAction = (func: Action<ItemView>) =>
    Object.values(this.itemViews).forEach(func);
  private getView = (id: string) => this.itemViews[id];

  //searchTab
  searchTab!: SearchTab;

  private cleanupAllSubviews = (itemId: string) =>
    this.store.forEachOpenChild(itemId, (item) => this.removeView(item.id));

  //dnd
  dnd!: Dnd;

  //player
  player!: Player;
  private itemPlayed: Item | undefined;
  private playItem = (item: Item) => {
    this.itemPlayed = item;
    this.player.play(item);
  };
}
