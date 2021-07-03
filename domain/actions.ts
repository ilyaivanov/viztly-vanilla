import * as items from "./items";

type ActionHandler = (state: AppState) => ActionResult;

const onRightArrow: ActionHandler = (state) => {
  const selectedId = getItemSelected(state);

  const isEmpty = items.getChildren(state.items, selectedId).length == 0;

  const isOpen = items.isOpen(state.items, selectedId);

  const isNeededToBeLoaded = items.isNeededToBeLoaded(state.items, selectedId);

  const isLoading = items.isLoading(state.items, selectedId);

  if (isNeededToBeLoaded) {
    return merge(open(state, selectedId), startLoading(state, selectedId));
  } else if (isOpen && !isEmpty)
    return changeSelectionOnFocusedArea(
      state,
      items.getChildren(state.items, selectedId)[0]
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

const focusOn = (state: AppState, area: FocusArea): ActionResult => {
  const commands =
    area === "main"
      ? {
          select: state.mainSelectedItem,
          unselect: state.searchSelectedItem,
        }
      : {
          select: state.searchSelectedItem,
          unselect: state.mainSelectedItem,
        };
  return {
    nextState: {
      ...state,
      uiState: {
        ...state.uiState,
        areaFocused: area,
      },
    },
    commands,
  };
};

const itemsLoaded = (
  state: AppState,
  itemId: string,
  childs: Item[]
): ActionResult => ({
  nextState: {
    ...state,
    items: items.itemLoaded(state.items, itemId, childs),
  },
  commands: { stopLoading: itemId },
});

const changeSelectionOnFocusedArea = (
  state: AppState,
  itemId: string
): ActionResult => {
  const currentSelectedItem = getItemSelected(state);
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
    commands: {
      select: itemId,
      unselect: currentSelectedItem,
    },
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
  commands: { startLoading: itemId },
});

const close = (state: AppState, itemId: string): ActionResult => ({
  nextState: {
    ...state,
    items: items.assignItem(state.items, itemId, () => ({ isOpen: false })),
  },
  commands: { close: itemId },
});

const open = (state: AppState, itemId: string): ActionResult => ({
  nextState: {
    ...state,
    items: items.assignItem(state.items, itemId, () => ({ isOpen: true })),
  },
  commands: { open: itemId },
});

const noop = (state: AppState): ActionResult => ({
  nextState: state,
  commands: {},
});

const merge = (result1: ActionResult, result2: ActionResult): ActionResult => ({
  nextState: {
    ...result1.nextState,
    ...result2.nextState,
  },
  commands: {
    ...result1.commands,
    ...result2.commands,
  },
});

export default {
  onRightArrow,
  onLeftArrow,
  onDownArrow,
  onUpArrow,
  itemsLoaded,
  focusOn,
};
