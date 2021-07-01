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

it("having two items with first selected going down selects second item", () => {
  const state: AppState = {
    items: buildItems(`
        HOME
          1
          2
      `),
    selectedItem: "2",
  };
  expect(actions.onDownArrow(state).nextState.selectedItem).toBe("2");
});

it("having two items with first selected going down selects second item", () => {
  const state: AppState = {
    items: buildItems(`
        HOME
          1
          2
            2.1
      `),
    selectedItem: "2.1",
  };
  expect(actions.onDownArrow(state).nextState.selectedItem).toBe("2.1");
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

it("going down when selected item is open and has children selects first child", () => {
  const state: AppState = {
    items: buildItems(`
        HOME
          1 -open
            1.1
          2
      `),
    selectedItem: "1",
  };
  expect(actions.onDownArrow(state).nextState.selectedItem).toBe("1.1");
});

it("going up selects parent if selected item is first in context", () => {
  const state: AppState = {
    items: buildItems(`
        HOME
          1 -open
            1.1
          2
      `),
    selectedItem: "1.1",
  };
  expect(actions.onUpArrow(state).nextState.selectedItem).toBe("1");
});

it("going down when selected item is the last in context selects next item", () => {
  const state: AppState = {
    items: buildItems(`
        HOME
          1 -open
            1.1 -open
              1.1.1
          2
      `),
    selectedItem: "1.1.1",
  };
  expect(actions.onDownArrow(state).nextState.selectedItem).toBe("2");
});

it("going up when selects the most nested items if previous item is open", () => {
  const state: AppState = {
    items: buildItems(`
        HOME
          1 -open
            1.1 -open
              1.1.1
          2
      `),
    selectedItem: "2",
  };
  expect(actions.onUpArrow(state).nextState.selectedItem).toBe("1.1.1");
});
