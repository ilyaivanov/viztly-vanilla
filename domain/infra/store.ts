import { buildState } from "../specs/itemsBuilder";
import StoreEvents from "./storeEvents";
import actions from "../actions";
import { findVideos, loadPlaylistItems } from "../../api/youtube";
import { items } from "..";

export class Store {
  events = new StoreEvents();

  state: AppState = buildState(`
    HOME
      First -open -mainSelected
        Child_1
        Child_2
        Child_3 -open
          Subchild_1
          Subchild_2
      Second
      Third
      Fourth
      Fifth
      Six_(closed)
        Six_one
        Six_two
    SEARCH
  `);

  apply = (actionResult: ActionResult) => {
    this.state = actionResult.nextState;

    Object.entries(actionResult.commands).forEach(([command, itemId]) => {
      const c = command as StoreEvent;
      if (itemId) this.events.triggerKeyed(c, itemId);
      else this.events.trigger(c);

      if (c === "item-start-loading") {
        loadPlaylistItems().then((itemChildren) =>
          this.apply(actions.itemsLoaded(this.state, itemId, itemChildren))
        );
      } else if (c === "item-close") {
        items.traverseOpenChildren(this.state.items, itemId, (item) => {
          this.events.clearKeyed("item-loaded", item.id);
          this.events.clearKeyed("item-select", item.id);
          this.events.clearKeyed("item-unselect", item.id);
          this.events.clearKeyed("item-open", item.id);
          this.events.clearKeyed("item-close", item.id);
        });
      }
    });
  };

  //queries
  hasSearchResults = () => !!this.state.items["SEARCH"].children;

  isOpen = (itemId: string) => items.isOpen(this.state.items, itemId);
  isLoading = (itemId: string) => items.isLoading(this.state.items, itemId);

  mapChildrenIfOpen = <T>(id: string, mapper: Func1<Item, T>): T[] =>
    items.mapChildrenIfOpen(this.state.items, id, mapper);

  mapRootItems = <T>(mapper: Func1<Item, T>): T[] =>
    items.mapRootItems(this.state.items, mapper);

  getEventsCount = this.events.getEventsCount;

  //actions
  searchForVideos = (term: string) => {
    this.apply(actions.searchForVideos(this.state));
    findVideos(term).then((items) => {
      this.apply(actions.searchResultsDone(this.state, items));
    });
  };

  //bindings
  bindToSearchFocus = (binder: Action<boolean>) => {
    binder(this.state.uiState.areaFocused === "search-input");
    this.events.on("search-input-focus", () => {
      console.log("from binder");
      binder(this.state.uiState.areaFocused === "search-input");
    });
  };

  bindToLoadingState = (binder: Action<boolean>) => {
    binder(this.state.uiState.isSearchLoading);
    this.events.on("search-loading", () =>
      binder(this.state.uiState.isSearchLoading)
    );
  };

  on = this.events.on;
  onKeyed = this.events.onKeyed;
}
