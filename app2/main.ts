import { buildItems } from "../domain/specs/itemsBuilder";
import { anim, dom, style } from "../browser";
import actions from "../domain/actions";
import { loadPlaylistItems } from "../api/youtube";
import { items } from "../domain";

//domain
class Store {
  state: AppState;

  constructor() {
    const s = buildItems(`
    HOME
      first -mainSelected -open
        first1
        first2 -open
          first2.1
          first2.2
          first2.3
      second
        s1
        s2
        s3
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

  init = () =>
    glue.dispatchCommands({ "item-select": this.state.mainSelectedItem });

  //queries
  mapChildren = <T>(id: string, mapper: Func1<Item, T>): T[] => {
    const items = this.state.items;
    return items[id].children!.map((id) => mapper(items[id]));
  };

  isOpen = (id: string) => !!this.state.items[id].isOpen;
  isLoading = (id: string) => !!this.state.items[id].isLoading;

  forEachOpenChild = (id: string, action: Action<Item>) =>
    items.traverseOpenChildren(this.state.items, id, action);

  //actions
  onKeyUp = () => this.performAction(actions.onUpArrow);
  onKeyDown = () => this.performAction(actions.onDownArrow);
  onKeyLeft = () => this.performAction(actions.onLeftArrow);
  onKeyRight = () => this.performAction(actions.onRightArrow);
  itemsLoaded = (id: string, items: Item[]) =>
    this.performAction((state) => actions.itemsLoaded(state, id, items));

  runDiagnostics = () => glue.printEvents();

  private performAction = (action: Func1<AppState, ActionResult>) => {
    const { commands, nextState } = action(this.state);
    this.state = nextState;
    glue.dispatchCommands(commands);
  };
}

class CommandsDispatcher {
  constructor(private store: Store) {}
  itemViews: Record<string, ItemView> = {};

  saveView = (id: string, view: ItemView) => (this.itemViews[id] = view);
  removeView = (id: string) => delete this.itemViews[id];

  dispatchCommands = (commands: ActionCommands) => {
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
    });
  };

  printEvents = () => {
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
}

class KeyboardShortcuts {
  constructor(private store: Store) {
    document.addEventListener("keydown", this.handleKey);
  }

  handleKey = (e: KeyboardEvent) => {
    if (e.code === "ArrowDown") this.store.onKeyDown();
    if (e.code === "ArrowUp") this.store.onKeyUp();
    if (e.code === "ArrowLeft") this.store.onKeyLeft();
    if (e.code === "ArrowRight") this.store.onKeyRight();
    if (e.code === "KeyB" && e.ctrlKey) this.store.runDiagnostics();
  };
}

//view

const store = new Store();
const glue = new CommandsDispatcher(store);
new KeyboardShortcuts(store);

class ItemView {
  el: HTMLLIElement;
  title: HTMLSpanElement;
  childrenContainer: HTMLElement | undefined;

  constructor(private item: Item) {
    const { title, id } = item;
    this.title = dom.span({ text: title });
    this.el = dom.li({ children: [this.title], id: id });

    if (store.isOpen(id)) {
      this.childrenContainer = this.viewChildren();
      this.el.appendChild(this.childrenContainer);
    }
    glue.saveView(item.id, this);
  }

  select = () => dom.addClass(this.title, "item-title_selected");
  unselect = () => dom.removeClass(this.title, "item-title_selected");

  open = () => {
    if (!anim.revertAnimations(this.childrenContainer)) {
      this.childrenContainer = this.viewChildren();
      this.el.appendChild(this.childrenContainer);
      anim
        .expand(this.childrenContainer)
        .addEventListener("finish", this.onChildrenAnimationDone);
    }
  };

  close = () => {
    const childEl = this.childrenContainer;
    if (!anim.revertAnimations(childEl) && childEl)
      anim
        .collapse(childEl)
        .addEventListener("finish", this.onChildrenAnimationDone);
  };

  itemLoaded = () => this.crossFadeIntoLoaded();

  private crossFadeIntoLoaded = () => {
    if (store.isOpen(this.item.id)) {
      const newContent = this.viewChildren();
      const container = this.childrenContainer;
      if (container)
        anim.crossFade(
          container,
          container.firstChild as HTMLElement, //loading label
          newContent
        );
    }
  };
  private onChildrenAnimationDone = () => {
    if (this.childrenContainer && !store.isOpen(this.item.id)) {
      this.childrenContainer.remove();
      this.childrenContainer = undefined;
    }
  };

  private viewChildren = () => {
    const res = document.createElement("div");
    res.style.overflow = "hidden";
    if (!store.isLoading(this.item.id)) {
      dom.setChildren(res, [viewTree(this.item.id)]);
    } else res.appendChild(dom.span({ text: "Loading..." }));
    return res;
  };

  static view = (item: Item): HTMLLIElement => new ItemView(item).el;
}

const viewTree = (id = "HOME") =>
  dom.ul({ children: store.mapChildren(id, ItemView.view) });

document.body.appendChild(viewTree());
store.init();

style.class("item-title_selected", { fontWeight: "bold" });
