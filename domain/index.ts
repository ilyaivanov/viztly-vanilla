import { Store } from "./infra/store";

export * as items from "./items";
import a from "./actions";

export const actions = {
  onArrowUp: () => store.apply(a.onUpArrow(store.state)),
  onArrowDown: () => store.apply(a.onDownArrow(store.state)),
  onArrowLeft: () => store.apply(a.onLeftArrow(store.state)),
  onArrowRight: () => store.apply(a.onRightArrow(store.state)),
  focusOn: (area: FocusArea) => store.apply(a.focusOn(store.state, area)),
};

export const store = new Store() as Store;

//@ts-expect-error
global.store = store;
