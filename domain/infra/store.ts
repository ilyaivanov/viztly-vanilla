import { CommandsDispatcher } from "./commandsDispatcher";
import { buildState } from "../specs/itemsBuilder";

export class Store {
  private commandsDispatcher = new CommandsDispatcher();
  registerView = this.commandsDispatcher.registerView;

  state: AppState = buildState(`
    HOME
      First -open -mainSelected
        Child_1
        Child_2
        Child_3 -open
          Subchild_1
          Subchild_2
      Second
      Third
      Fourth
      Fifth
      Six_(closed)
        Six_one
        Six_two
    SEARCH
      search1 -searchSelected
        search_sub1
        search_sub2
        search_sub3
        search_sub4
      search2
      search3
  `);

  apply = (actionResult: ActionResult) => {
    this.state = actionResult.nextState;
    Object.entries(actionResult.commands).forEach(([command, elementId]) =>
      this.commandsDispatcher.sendCommand(elementId, command as Command)
    );
  };
}
