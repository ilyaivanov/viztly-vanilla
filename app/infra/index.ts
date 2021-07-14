import { CommandsDispatcher } from "./dispatcher";
import { KeyboardShortcuts } from "../view/shortcuts";
import { Store } from "../domain/store";
import Dnd from "../view/dnd";

export const store = new Store();
export const glue = new CommandsDispatcher(store);

new KeyboardShortcuts();
new Dnd(document.body);
