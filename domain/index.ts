import { ActionsDispatcher, Store } from "./infra/store";

export * as items from "./items";
export const store = new Store() as Store & ActionsDispatcher;

//@ts-expect-error
global.store = store;
