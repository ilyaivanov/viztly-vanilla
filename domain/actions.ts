import * as items from "./items";

export const onRightArrow = (state: AppState): ActionResult => {
  return noop(state);
};

export const onLeftArrow = (state: AppState): ActionResult => {
  return noop(state);
};

export const onDownArrow = (state: AppState): ActionResult => {
  const prevItem = items.getNextBelow(state.items, state.selectedItem);
  if (prevItem && prevItem != state.selectedItem)
    return selectItem(state, prevItem);
  else return noop(state);
};

export const onUpArrow = (state: AppState): ActionResult => {
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

const noop = (state: AppState): ActionResult => ({
  nextState: state,
  commands: {},
});
