import { CommandsDispatcher } from "./dispatcher";
import { KeyboardShortcuts } from "../view/shortcuts";
import { Store } from "../domain/store";

export const store = new Store();
export const glue = new CommandsDispatcher(store);

new KeyboardShortcuts();
