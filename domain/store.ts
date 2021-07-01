import { CommandsDispatcher } from "./commands";
import * as items from "./items";

export class Store {
  private commandsDispatcher = new CommandsDispatcher();
  registerView = this.commandsDispatcher.registerView;

  state: AppState = {
    selectedItem: "1",
    items: items.initial,
  };

  apply = (actionResult: ActionResult) => {
    this.state = actionResult.nextState;
    Object.entries(actionResult.commands).forEach(([command, elementId]) =>
      this.commandsDispatcher.sendCommand(elementId, command as Command)
    );
  };
}
