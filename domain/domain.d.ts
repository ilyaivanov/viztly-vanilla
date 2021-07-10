type ActionResult = {
  nextState: AppState;
  commands: ActionCommands;
};

type ActionCommands = Partial<Record<StoreEvent, string | undefined>>;

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
