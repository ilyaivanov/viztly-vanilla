import { buildItems } from "./specs/itemsBuilder";
import actions from "./actions";
import * as items from "./items";

export class Store {
  state: AppState;

  private dispatch!: (commands: ActionCommands) => void;
  saveDispatcher = (dispatcher: Action<ActionCommands>) =>
    (this.dispatch = dispatcher);

  constructor() {
    const s = buildItems(`
      HOME
        first12 -mainSelected -open
          first1
          first2 -open
            first2.1
            first2.2
            first2.3
        second
          s1
          s2
          s3  
      SEARCH
      `);
    this.state = {
      items: s.items,
      mainSelectedItem: s.mainTabSelectedId,
      searchSelectedItem: s.searchTabSelectedId,
      uiState: {
        areaFocused: "main",
        isSearchLoading: false,
        isSearchVisible: false,
      },
    };
  }

  init = () => this.dispatch({ "item-select": this.state.mainSelectedItem });

  //queries
  mapChildren = <T>(id: string, mapper: Func1<Item, T>): T[] => {
    const items = this.state.items;
    return items[id].children!.map((id) => mapper(items[id]));
  };

  isOpen = (id: string) => !!this.state.items[id].isOpen;
  isLoading = (id: string) => !!this.state.items[id].isLoading;

  forEachOpenChild = (id: string, action: Action<Item>) =>
    items.traverseOpenChildren(this.state.items, id, action);

  hasSearchResults = () => !!this.state.items["SEARCH"].children;

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

  itemsLoaded = (id: string, items: Item[]) =>
    this.performAction((state) => actions.itemsLoaded(state, id, items));

  switchToSearch = () =>
    this.performAction((state) => actions.focusOn(state, "search"));

  switchToMain = () =>
    this.performAction((state) => actions.focusOn(state, "main"));
  switchToSearchInput = () =>
    this.performAction((state) => actions.focusOn(state, "search-input"));

  runDiagnostics = () => this.dispatch({ "run-diagnostics": undefined });

  searchForVideos = (term: string) => {
    this.performAction(actions.searchForVideos);
    this.dispatch({ "search-find-videos": term });
  };

  searchDone = (items: Item[]) =>
    this.performAction((state) => actions.searchResultsDone(state, items));

  private performAction = (action: Func1<AppState, ActionResult>) => {
    const { commands, nextState } = action(this.state);
    this.state = nextState;
    this.dispatch(commands);
  };
}
