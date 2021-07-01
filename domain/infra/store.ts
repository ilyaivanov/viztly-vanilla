import { CommandsDispatcher } from "./commandsDispatcher";
import * as items from "../items";
import actions from "../actions";

export type ActionsDispatcher = Record<keyof typeof actions, () => void>;

export class Store {
  private commandsDispatcher = new CommandsDispatcher();
  registerView = this.commandsDispatcher.registerView;

  state: AppState = {
    selectedItem: "1",
    items: items.initial,
  };

  constructor() {
    Object.keys(actions).forEach((actionName) => {
      //@ts-expect-error
      this[actionName] = () => this.apply(actions[actionName](this.state));
    });
  }

  private apply = (actionResult: ActionResult) => {
    this.state = actionResult.nextState;
    Object.entries(actionResult.commands).forEach(([command, elementId]) =>
      this.commandsDispatcher.sendCommand(elementId, command as Command)
    );
  };
}
