import { CommandsDispatcher } from "./dispatcher";
import { KeyboardShortcuts } from "./shortcuts";
import { Store } from "./store";

export const store = new Store();
export const glue = new CommandsDispatcher(store);

new KeyboardShortcuts(store);
