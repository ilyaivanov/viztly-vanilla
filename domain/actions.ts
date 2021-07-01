import * as items from "./items";

type ActionHandler = (state: AppState) => ActionResult;

const onRightArrow: ActionHandler = (state) => {
  const isEmpty =
    items.getChildren(state.items, state.selectedItem).length == 0;
  if (items.isOpen(state.items, state.selectedItem) && !isEmpty)
    return selectItem(
      state,
      items.getChildren(state.items, state.selectedItem)[0]
    );
  if (!isEmpty) return open(state, state.selectedItem);
  return noop(state);
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

export default {
  onRightArrow,
  onLeftArrow,
  onDownArrow,
  onUpArrow,
};
