type ActionResult = {
  nextState: AppState;
  events: DomainEvent[];
};

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

type FocusArea = "main" | "search" | "search-input";

type DropPlacement = "before" | "after" | "inside";
type DropDescription = {
  itemUnder: string;
  itemOver: string;
  placement: DropPlacement;
};

type PersistedState = {
  selectedItemId: string;
  focusedStack: string[];
  itemsSerialized: string;
  ui?: {
    leftSidebarWidth: number;
  };
};
