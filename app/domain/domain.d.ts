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

type Items = Record<string, Item>;

type Item = {
  id: string;
  title: string;
  isOpen?: boolean;
  isLoading?: boolean;
  children?: string[];
};
