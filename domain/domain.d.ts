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

  mainSelectedItem: string;
  searchSelectedItem: string;

  uiState: UIState;
};

type UIState = {
  isSearchVisible: boolean;
  isSearchLoading: boolean;
  areaFocused: FocusArea;
};

type FocusArea = "main" | "search" | "serch-input";

type Items = Record<string, Item>;

type Item = {
  id: string;
  title: string;
  isOpen?: boolean;
  isLoading?: boolean;
  children?: string[];
};
