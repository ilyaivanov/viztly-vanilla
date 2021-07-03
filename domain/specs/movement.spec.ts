import actions from "../actions";
import * as items from "../items";
import { buildState } from "./itemsBuilder";

it("having two items with first selected going down selects second item", () => {
  const state: AppState = buildState(`
      HOME
        1 -mainSelected
        2
    `);
  expect(actions.onDownArrow(state).nextState.mainSelectedItem).toBe("2");
});

it("having two items with first selected going down selects second item", () => {
  const state: AppState = buildState(`
      HOME
        1 
        2 -mainSelected
    `);
  expect(actions.onDownArrow(state).nextState.mainSelectedItem).toBe("2");
});

it("having two items with first selected going down selects second item", () => {
  const state: AppState = buildState(`
      HOME
        1 
        2 
          2.1 -mainSelected
    `);
  expect(actions.onDownArrow(state).nextState.mainSelectedItem).toBe("2.1");
});

it("having two items with second selected going up selects first item", () => {
  const state: AppState = buildState(`
      HOME
        1 
        2 -mainSelected
    `);
  expect(actions.onUpArrow(state).nextState.mainSelectedItem).toBe("1");
});

it("going down when selected item is open and has children selects first child", () => {
  const state: AppState = buildState(`
      HOME
        1 -open -mainSelected
          1.1
        2 
    `);
  expect(actions.onDownArrow(state).nextState.mainSelectedItem).toBe("1.1");
});

it("going up selects parent if selected item is first in context", () => {
  const state: AppState = buildState(`
      HOME
        1 -open 
          1.1 -mainSelected
        2 
    `);
  expect(actions.onUpArrow(state).nextState.mainSelectedItem).toBe("1");
});

it("going down when selected item is the last in context selects next item", () => {
  const state: AppState = buildState(`
      HOME
        1 -open 
          1.1 -open
            1.1.1 -mainSelected
        2 
    `);
  expect(actions.onDownArrow(state).nextState.mainSelectedItem).toBe("2");
});

it("going up when selects the most nested items if previous item is open", () => {
  const state: AppState = buildState(`
      HOME
        1 -open 
          1.1 -open
            1.1.1 
        2 -mainSelected
    `);
  expect(actions.onUpArrow(state).nextState.mainSelectedItem).toBe("1.1.1");
});

describe("having selected an open folder", () => {
  const state = (): AppState =>
    buildState(`
    HOME
      1 -open 
        1.1 -open -mainSelected
          1.1.1 
      2 
  `);
  it("on arrow left closes that folder", () => {
    const { nextState } = actions.onLeftArrow(state());
    expect(items.isOpen(nextState.items, "1.1")).toBe(false);
  });

  it("on arrow right selects first child", () => {
    const { nextState } = actions.onRightArrow(state());
    expect(nextState.mainSelectedItem).toBe("1.1.1");
  });
});

describe("having selected a closed folder", () => {
  const state = (): AppState =>
    buildState(`
      HOME
        1 -open 
          1.1 -mainSelected
            1.1.1 
        2 
    `);
  it("on arrow left selects parent", () => {
    const { nextState } = actions.onLeftArrow(state());
    expect(nextState.mainSelectedItem).toBe("1");
  });

  it("on arrow right opens folder", () => {
    const { nextState } = actions.onRightArrow(state());
    expect(items.isOpen(nextState.items, "1.1")).toBe(true);
  });
});

it("having two items with first selected going left does nothing", () => {
  const state: AppState = buildState(`
      HOME
        1  -mainSelected
        2 
    `);
  const { nextState, commands } = actions.onLeftArrow(state);
  expect(nextState).toEqual(state);
  expect(commands).toEqual({});
});

// //commenting out since I'm loading all folders right now
// //not a production feature, only while working on loading
// xit("having an open empty folder going right does nothing", () => {
//   const state: AppState = {
//     items: buildItems(`
//         HOME
//           1 -open
//           2
//       `),
//     uiState: defaultUiState(),
//     mainSelectedItem: "1",
//   };
//   const { nextState, commands } = actions.onRightArrow(state);
//   expect(nextState).toEqual(state);
//   expect(commands).toEqual({});
// });
