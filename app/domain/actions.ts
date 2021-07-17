import * as items from "./items";

type ActionHandler = (state: AppState) => ActionResult;

const onRightArrow: ActionHandler = (state) => {
  const selectedId = getItemSelected(state);

  const isEmpty = items.getChildren(state.items, selectedId).length == 0;

  const isOpen = items.isOpen(state.items, selectedId);

  const isNeededToBeLoaded = items.isNeededToBeLoaded(state.items[selectedId]);

  const isLoading = items.isLoading(state.items, selectedId);
  if (isNeededToBeLoaded) {
    return merge(open(state, selectedId), startLoading(state, selectedId));
  } else if (isOpen && !isEmpty)
    return changeSelectionOnFocusedArea(
      state,
      items.getChildrenIds(state.items, selectedId)[0]
    );
  else if (!isEmpty || isLoading) return open(state, selectedId);
  else return noop(state);
};

const onLeftArrow: ActionHandler = (state) => {
  const selectedId = getItemSelected(state);

  if (items.isOpen(state.items, selectedId)) return close(state, selectedId);

  const parentId = items.getParentId(state.items, selectedId);
  if (!items.isRoot(parentId))
    return changeSelectionOnFocusedArea(state, parentId);
  return noop(state);
};

const onDownArrow: ActionHandler = (state) => {
  const selectedId = getItemSelected(state);

  const prevItem = items.getNextBelow(state.items, selectedId);
  if (prevItem && prevItem != selectedId)
    return changeSelectionOnFocusedArea(state, prevItem);
  else return noop(state);
};

const onUpArrow: ActionHandler = (state) => {
  const selectedId = getItemSelected(state);

  const nextItem = items.getItemAbove(state.items, selectedId);
  if (nextItem && nextItem != selectedId)
    return changeSelectionOnFocusedArea(state, nextItem);
  else return noop(state);
};

const toggle = (state: AppState, id: string): ActionResult => {
  if (items.isOpen(state.items, id)) {
    return close(state, id);
  } else {
    if (items.isNeededToBeLoaded(state.items[id]))
      return merge(open(state, id), startLoading(state, id));
    else return open(state, id);
  }
};

const focusOn = (state: AppState, area: FocusArea): ActionResult => {
  let events: DomainEvent[] = [];

  if (area === "main")
    events = [{ type: "item-select", payload: state.mainSelectedItem }];
  else if (area == "search") {
    const children = items.getChildrenIds(state.items, "SEARCH");
    if (children.length === 0) {
      events = [
        { type: "item-select", payload: "search-input" },
        { type: "search-tab-visibility-change" },
      ];
      area = "search-input";
    } else
      events = [
        { type: "item-select", payload: state.searchSelectedItem },
        { type: "search-tab-visibility-change" },
      ];
  } else if (area === "search-input") {
    events = [
      { type: "item-select", payload: "search-input" },
      { type: "search-tab-visibility-change" },
    ];
  }
  return {
    nextState: {
      ...state,
      uiState: {
        ...state.uiState,
        isSearchVisible: area === "search" || area === "search-input",
        areaFocused: area,
      },
    },
    events: events,
  };
};

const hideSearch = (state: AppState): ActionResult => {
  if (state.uiState.areaFocused !== "main")
    return {
      nextState: {
        ...state,
        uiState: {
          ...state.uiState,
          areaFocused: "main",
          isSearchVisible: false,
        },
      },
      events: [
        { type: "search-tab-visibility-change" },
        { type: "item-select", payload: state.mainSelectedItem },
      ],
    };
  return noop(state);
};

const itemsLoaded = (
  state: AppState,
  itemId: string,
  childs: Item[]
): ActionResult => ({
  nextState: {
    ...state,
    items: items.itemLoaded(state.items, itemId, childs),
    uiState: {
      ...state.uiState,
      isSearchLoading: false,
    },
  },
  events: [{ type: "item-loaded", payload: itemId }],
});

const searchForVideos = (state: AppState): ActionResult => {
  return {
    nextState: {
      ...state,
      uiState: {
        ...state.uiState,
        isSearchLoading: true,
      },
    },
    events: [{ type: "search-loading" }],
  };
};

const searchResultsDone = (
  state: AppState,
  itemsFound: Item[]
): ActionResult => {
  // commands are ignored deliberately, I'm not showing SEARCH node
  const { nextState } = itemsLoaded(state, "SEARCH", itemsFound);
  return {
    nextState: {
      ...nextState,
      searchSelectedItem: items.getChildrenIds(nextState.items, "SEARCH")[0],
    },
    events: [{ type: "search-loading" }],
  };
};

const changeSelectionOnFocusedArea = (
  state: AppState,
  itemId: string
): ActionResult => {
  const nextState = { ...state };
  if (state.uiState.areaFocused == "main") nextState.mainSelectedItem = itemId;
  else if (state.uiState.areaFocused == "search")
    nextState.searchSelectedItem = itemId;
  else
    throw new Error(
      "Trying to call changeSelectionOnFocusedArea while search input is focused"
    );
  return {
    nextState,
    events: [{ type: "item-select", payload: itemId }],
  };
};

const getItemSelected = (state: AppState): string => {
  if (state.uiState.areaFocused == "main") return state.mainSelectedItem;
  else if (state.uiState.areaFocused == "search")
    return state.searchSelectedItem;
  throw new Error("Trying to get selectedItem while search input is focused");
};

//warning: assignItems does mutate items, and thus merge function works for deep nested state
//if I will make assignItem pure (which I probably will), it will break merge function and I will need
//to rewrite it
const startLoading = (state: AppState, itemId: string): ActionResult => ({
  nextState: {
    ...state,
    items: items.assignItem(state.items, itemId, () => ({ isLoading: true })),
  },
  events: [{ type: "item-start-loading", payload: itemId }],
});

const close = (state: AppState, itemId: string): ActionResult => ({
  nextState: {
    ...state,
    items: items.assignItem(state.items, itemId, () => ({ isOpen: false })),
  },
  events: [{ type: "item-close", payload: itemId }],
});

const open = (state: AppState, itemId: string): ActionResult => ({
  nextState: {
    ...state,
    items: items.assignItem(state.items, itemId, () => ({ isOpen: true })),
  },
  events: [{ type: "item-open", payload: itemId }],
});

const removeSelected = (state: AppState): ActionResult => {
  const itemId = getItemSelected(state);
  let itemToFocus = items.getItemAbove(state.items, itemId);
  if (!itemToFocus) itemToFocus = items.getNextBelow(state.items, itemId);

  const parentId = items.getParentId(state.items, itemId);
  const parent = state.items[parentId];

  //TODO: remove all children, not only this node
  delete state.items[itemId];
  if (items.isContainer(parent))
    parent.children = parent.children.filter((id) => id != itemId);

  let nextState: AppState = state;
  if (itemToFocus)
    nextState = changeSelectionOnFocusedArea(state, itemToFocus).nextState;
  return {
    nextState: nextState,
    events: [
      { type: "item-select", payload: itemToFocus! },
      { type: "item-removed", payload: { itemId, fireAnimation: true } },
    ],
  };
};

export const startRenameSelectedItem = (state: AppState): ActionResult => {
  return {
    nextState: state,
    events: [{ type: "item-startRename", payload: getItemSelected(state) }],
  };
};

export const playCurrentItem = (state: AppState): ActionResult => {
  return play(state, getItemSelected(state));
};

export const drop = (state: AppState, drop: DropDescription): ActionResult => {
  const itemOver = state.items[drop.itemOver];
  const context = items.getContext(state.items, drop.itemOver);
  const index = context.indexOf(drop.itemOver);
  context.splice(index, 1);
  const newItems =
    drop.placement == "after"
      ? items.insertItemAfter(state.items, drop.itemUnder, itemOver)
      : drop.placement == "before"
      ? items.insertItemBefore(state.items, drop.itemUnder, itemOver)
      : items.insertItemInside(state.items, drop.itemUnder, itemOver);

  const payload = { itemId: drop.itemUnder, folder: itemOver };
  const viewEvent: DomainEvent =
    drop.placement == "after"
      ? { type: "item-insertAfter", payload }
      : drop.placement == "before"
      ? { type: "item-insertBefore", payload }
      : { type: "item-insertInside", payload };
  return {
    nextState: {
      ...state,
      items: newItems,
    },
    events: [
      {
        type: "item-removed",
        payload: { itemId: drop.itemOver, fireAnimation: false },
      },
      viewEvent,
    ],
  };
};

export const createItemAfterSelected = (state: AppState): ActionResult => {
  const folder: Folder = {
    id: Math.random() + "",
    children: [],
    title: "New Folder",
    type: "folder",
  };
  const selctedItemId = getItemSelected(state);
  const inserted: AppState = {
    ...state,
    items: items.insertItemAfter(state.items, selctedItemId, folder),
  };
  const withSelected = changeSelectionOnFocusedArea(inserted, folder.id);
  const events: DomainEvent[] = [
    { type: "item-insertAfter", payload: { itemId: selctedItemId, folder } },
    { type: "item-startRename", payload: folder.id },
  ];
  return {
    nextState: withSelected.nextState,
    events: events.concat(withSelected.events),
  };
};
//player
const play = (state: AppState, id: string): ActionResult => {
  return {
    nextState: state,
    events: [{ type: "item-play", payload: state.items[id] }],
  };
};

const noop = (state: AppState): ActionResult => ({
  nextState: state,
  events: [],
});

const merge = (result1: ActionResult, result2: ActionResult): ActionResult => ({
  nextState: {
    ...result1.nextState,
    ...result2.nextState,
  },
  events: result1.events.concat(result2.events),
});

export default {
  onRightArrow,
  onLeftArrow,
  onDownArrow,
  onUpArrow,
  itemsLoaded,
  focusOn,
  searchForVideos,
  searchResultsDone,
  changeSelectionOnFocusedArea,
  hideSearch,
  removeSelected,
  startRenameSelectedItem,
  createItemAfterSelected,
  drop,
  toggle,
  playCurrentItem,
};
