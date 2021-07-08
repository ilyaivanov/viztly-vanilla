type ItemCommand =
  | "select"
  | "unselect"
  | "startLoading"
  | "stopLoading"
  | "open"
  | "close";

type UiCommand = "focus-search-input" | "blur-search-input";

type ItemCommands = Record<ItemCommand, () => void>;

type SearchCommand = "focus" | "unfocus" | "start-loading" | "stop-loading";

type SearchCommands = Record<SearchCommand, () => void>;

type Command = ItemCommand | UiCommand | SearchCommand;

type CommandListener = Partial<Record<Command, () => void>>;

type CommandA = {
  type: "select";
  itemId: string;
};

type CommandB = {
  type: "unselect";
  itemLabel: number;
};

type CommandsAll = CommandA | CommandB;

type ComandName = CommandsAll["type"];

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
