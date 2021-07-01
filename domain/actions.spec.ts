import actions from "./actions";
import { buildItems } from "./itemsBuilder";

it("having two items with first selected going down selects second item", () => {
  const state: AppState = {
    items: buildItems(`
        HOME
          1
          2
      `),
    selectedItem: "1",
  };
  expect(actions.onDownArrow(state).nextState.selectedItem).toBe("2");
});

it("having two items with second selected going up selects first item", () => {
  const state: AppState = {
    items: buildItems(`
        HOME
          1
          2
      `),
    selectedItem: "2",
  };
  expect(actions.onUpArrow(state).nextState.selectedItem).toBe("1");
});
