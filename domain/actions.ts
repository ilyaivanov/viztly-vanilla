import * as items from "./items";

type ActionHandler = (state: AppState) => ActionResult;

const onRightArrow: ActionHandler = (state) => {
  const isEmpty =
    items.getChildren(state.items, state.selectedItem).length == 0;

  const isOpen = items.isOpen(state.items, state.selectedItem);

  const isNeededToBeLoaded = items.isNeededToBeLoaded(
    state.items,
    state.selectedItem
  );

  const isLoading = items.isLoading(state.items, state.selectedItem);

  if (isNeededToBeLoaded) {
    return merge(
      open(state, state.selectedItem),
      startLoading(state, state.selectedItem)
    );
  } else if (isOpen && !isEmpty)
    return selectItem(
      state,
      items.getChildren(state.items, state.selectedItem)[0]
    );
  else if (!isEmpty || isLoading) return open(state, state.selectedItem);
  else return noop(state);
};

const onLeftArrow: ActionHandler = (state) => {
  if (items.isOpen(state.items, state.selectedItem))
    return close(state, state.selectedItem);

  const parentId = items.getParentId(state.items, state.selectedItem);
  if (!items.isRoot(parentId)) return selectItem(state, parentId);
  return noop(state);
};

const onDownArrow: ActionHandler = (state) => {
  const prevItem = items.getNextBelow(state.items, state.selectedItem);
  if (prevItem && prevItem != state.selectedItem)
    return selectItem(state, prevItem);
  else return noop(state);
};

const onUpArrow: ActionHandler = (state) => {
  const nextItem = items.getItemAbove(state.items, state.selectedItem);
  if (nextItem && nextItem != state.selectedItem)
    return selectItem(state, nextItem);
  else return noop(state);
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

const selectItem = (state: AppState, itemId: string): ActionResult => ({
  nextState: {
    ...state,
    selectedItem: itemId,
  },
  commands: {
    select: itemId,
    unselect: state.selectedItem,
  },
});

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
};
