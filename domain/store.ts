import { CommandsDispatcher } from "./commands";
import { getRootItems, initial } from "./items";

export class Store {
  private commandsDispatcher = new CommandsDispatcher();
  registerView = this.commandsDispatcher.registerView;

  selectedItemId = "1";

  items = initial;

  selectItem = (itemId: string) => {
    this.commandsDispatcher.sendCommand(this.selectedItemId, "unselect");
    this.selectedItemId = itemId;

    this.commandsDispatcher.sendCommand(this.selectedItemId, "select");
  };

  selectNextItem = () => {
    const items = this.items["HOME"].children!;
    const index = items.indexOf(this.selectedItemId);
    if (index < items.length - 1) this.selectItem(items[index + 1]);
  };

  selectPreviousItem = () => {
    const items = this.items["HOME"].children!;
    const index = items.indexOf(this.selectedItemId);
    if (index > 0) this.selectItem(items[index - 1]);
  };
}
