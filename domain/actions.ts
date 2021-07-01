import * as items from "./items";

type ActionHandler = (state: AppState) => ActionResult;

const onRightArrow: ActionHandler = (state) => {
  return noop(state);
};

const onLeftArrow: ActionHandler = (state) => {
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
