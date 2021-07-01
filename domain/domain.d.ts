type ItemCommand =
  | "select"
  | "unselect"
  | "startLoading"
  | "stopLoading"
  | "open"
  | "close";

type ItemCommands = Record<ItemCommand, () => void>;

type Command = ItemCommand;
type CommandListener = Partial<Record<Command, () => void>>;

type ActionResult = {
  nextState: AppState;
  commands: ActionResultCommands;
};

type ActionResultCommands = Partial<Record<Command, ElementId>>;

type ElementId = string;

type AppState = {
  items: Items;

  selectedItem: string;
};

type Items = Record<string, Item>;

type Item = {
  id: string;
  title: string;
  isOpen?: boolean;
  children?: string[];
};
