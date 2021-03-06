import actions from "./actions";
import * as items from "./items";
import { saveUserSettings } from "../api/userState";
import { sampleUserName } from "../api/config";

export class Store {
  state: AppState;

  private dispatch!: Action<DomainEvent[]>;
  saveDispatcher = (dispatcher: Action<DomainEvent[]>) =>
    (this.dispatch = dispatcher);

  constructor() {
    this.state = {
      items: initialItems(),
      mainSelectedItem: "s1",
      searchSelectedItem: "",
      uiState: {
        areaFocused: "main",
        isSearchLoading: false,
        isSearchVisible: false,
      },
    };
  }

  init = () =>
    this.dispatch([
      { type: "item-select", payload: this.state.mainSelectedItem },
    ]);

  //queries
  getItem = (id: string): Item => this.state.items[id];
  mapChildren = <T>(id: string, mapper: Func1<Item, T>): T[] =>
    items.getChildren(this.state.items, id).map(mapper);

  isOpen = (id: string) => items.isOpen(this.state.items, id);
  hasImage = (id: string) => items.hasImage(this.state.items[id]);
  getPreviewImage = (id: string) => items.getPreviewImage(this.state.items[id]);
  isLoading = (id: string) => items.isLoading(this.state.items, id);

  isPlaylist = (item: Item) => items.isPlaylist(item);
  isVideo = (item: Item) => items.isVideo(item);
  isChannel = (item: Item) => items.isChannel(item);
  isContainer = (item: Item) => items.isContainer(item);
  isEmpty = (item: Item) => items.isEmpty(this.state.items, item.id);
  isNeededToBeLoaded = (item: Item) => items.isNeededToBeLoaded(item);

  forEachOpenChild = (id: string, action: Action<Item>) =>
    items.traverseOpenChildren(this.state.items, id, action);

  hasSearchResults = () =>
    items.getChildren(this.state.items, "SEARCH").length > 0;

  isSearchInputFocused = () =>
    this.state.uiState.areaFocused === "search-input";
  isSearchLoading = () => this.state.uiState.isSearchLoading;
  isSearchVisible = () => this.state.uiState.isSearchVisible;

  //actions
  onKeyUp = () => this.performAction(actions.onUpArrow);
  onKeyDown = () => this.performAction(actions.onDownArrow);
  onKeyLeft = () => this.performAction(actions.onLeftArrow);
  onKeyRight = () => this.performAction(actions.onRightArrow);
  onEscape = () => this.performAction(actions.hideSearch);
  toggle = (id: string) =>
    this.performAction((state) => actions.toggle(state, id));

  removeSelected = () => this.performAction(actions.removeSelected);
  createItemAfterSelected = () =>
    this.performAction(actions.createItemAfterSelected);

  startRenameSelectedItem = () =>
    this.performAction(actions.startRenameSelectedItem);

  itemsLoaded = (id: string, items: Item[]) =>
    this.performAction((state) => actions.itemsLoaded(state, id, items));

  switchToSearch = () =>
    this.performAction((state) => actions.focusOn(state, "search"));

  switchToMain = () =>
    this.performAction((state) => actions.focusOn(state, "main"));
  switchToSearchInput = () =>
    this.performAction((state) => actions.focusOn(state, "search-input"));

  runDiagnostics = () => this.dispatch([{ type: "run-diagnostics" }]);

  select = (itemID: string) => {
    const root = items.getRootFor(this.state.items, itemID);
    if (root === "HOME") {
      this.switchToMain();
    } else if (root === "SEARCH") {
      this.switchToSearch();
    } else {
      throw new Error("Unknown parent for " + this.state.items[itemID].title);
    }
    this.performAction((state) =>
      actions.changeSelectionOnFocusedArea(state, itemID)
    );
  };
  searchForVideos = (term: string) => {
    this.performAction(actions.searchForVideos);
    this.dispatch([{ type: "search-find-videos", payload: term }]);
  };

  searchDone = (items: Item[]) =>
    this.performAction((state) => actions.searchResultsDone(state, items));

  saveItems = () =>
    saveUserSettings(this.createPersistedState(), sampleUserName);
  //DND
  onMouseDown = (item: Item) => {
    this.performAction(() => ({
      nextState: this.state,
      events: [{ type: "item-mouse-down", payload: item }],
    }));
  };

  onMouseOverDuringDrag = (itemUnder: Item, e: MouseEvent) => {
    this.performAction(() => ({
      nextState: this.state,
      events: [
        { type: "item-mouse-move-during-drag", payload: { itemUnder, e } },
      ],
    }));
  };

  dropItem = (dropDef: DropDescription) =>
    this.performAction((state) => actions.drop(state, dropDef));

  mouseUp = () => {
    this.performAction(() => ({
      nextState: this.state,
      events: [{ type: "item-mouse-up-during-drag" }],
    }));
  };

  //player
  playCurrentItem = () => {
    this.performAction(actions.playCurrentItem);
  };

  private performAction = (action: Func1<AppState, ActionResult>) => {
    const { events, nextState } = action(this.state);
    this.state = nextState;
    this.dispatch(events);
  };

  private createPersistedState = (): PersistedState => {
    const homeNodes: Items = {};
    const traverse = (id: string) => {
      const item = this.state.items[id];
      homeNodes[id] = item;
      if (items.isContainer(item) && item.children.length > 0) {
        item.children.forEach(traverse);
      }
    };
    traverse("HOME");

    const savingCount = Object.keys(homeNodes).length;
    const actualCount = Object.keys(this.state.items).length;
    console.log(
      `Saving ${savingCount} items (currently in state ${actualCount} items)`
    );

    //selected node might be removed, in that case point to a HOME
    const currentSelectedId = "HOME";
    // const persistedItemId = homeNodes[currentSelectedId]
    // ? currentSelectedId
    // : "HOME";
    return {
      focusedStack: [],
      itemsSerialized: JSON.stringify(homeNodes),
      selectedItemId: currentSelectedId,
    };
  };
}

const initialItems = (): Items => ({
  HOME: {
    id: "HOME",
    title: "Home",
    children: ["s1", "s2", "s3"],
    type: "folder",
  },
  SEARCH: {
    id: "SEARCH",
    title: "Home",
    children: [],
    type: "search",
    searchTerm: "",
  },
  s1: {
    id: "s1",
    // image: "https://i.ytimg.com/vi/5z6IKnYXqFM/mqdefault.jpg",
    // channelTitle: "The Psychedelic Muse",
    // channelId: "UCAepXw94EhaO0CZV9f5D3fQ",
    videoId: "5z6IKnYXqFM",
    title: "Sync24 - Comfortable Void [Full Album]",
    type: "YTvideo",
  },
  s2: {
    id: "s2",
    image: "https://i.ytimg.com/vi/c117hJ9dje8/mqdefault.jpg",
    // itemId: "PLt4Ljtd00HDDGp7zThOo9bo6icToNWC2O",
    title: "Sync24 - Acidious - 2020",
    // channelTitle: "A. Fedorov",
    // channelId: "UCJsgvVDwBGl__jTJ7uYwl0g",
    type: "YTplaylist",
    children: [],
    playlistId: "PLt4Ljtd00HDDGp7zThOo9bo6icToNWC2O",
  },
  s3: {
    id: "s3",
    // image: "https://i.ytimg.com/vi/8ONz3_vjJIY/mqdefault.jpg",
    // channelTitle: "The Psychedelic Muse",
    // channelId: "UCAepXw94EhaO0CZV9f5D3fQ",
    // itemId: "8ONz3_vjJIY",
    title: "Sync24 - Omnious [Full Album]",
    type: "YTvideo",
    videoId: "8ONz3_vjJIY",
  },
});
