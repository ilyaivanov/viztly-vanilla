import { buildState } from "./itemsBuilder";
import actions from "../actions";

describe("havign two items in main and search ", () => {
  const state: AppState = buildState(`
    HOME
        1 -mainSelected
        2
    SEARCH
        s1 -searchSelected
        s2
    `);
  it("while focus on main moving down moves main and doesnt change search", () => {
    const { nextState } = actions.onDownArrow(state);

    expect(nextState.mainSelectedItem).toEqual("2");
    expect(nextState.searchSelectedItem).toEqual("s1");
  });

  it("while focus on search moving down moves searcg and doesnt change main", () => {
    const searchFocused = actions.focusOn(state, "search");

    expect(searchFocused.nextState.uiState.areaFocused).toEqual("search");

    const { nextState } = actions.onDownArrow(searchFocused.nextState);

    expect(nextState.mainSelectedItem).toEqual("1");
    expect(nextState.searchSelectedItem).toEqual("s2");
  });

  it("having no search items focusing on search tab focuses search input", () => {
    const state: AppState = buildState(`
    HOME
        1 -mainSelected
        2
    SEARCH
    `);
    const { nextState, commands } = actions.focusOn(state, "search");
    expectEqual(commands, {
      "search-input-focus": undefined,
      "item-unselect": "1",
    });
    expectEqual(nextState.uiState.areaFocused, "search-input");
  });

  it("by default search is hidden", () => {
    const state: AppState = buildState(`
    HOME
        1 -mainSelected
        2
    SEARCH
    `);

    expectEqual(state.uiState.isSearchVisible, false);
  });
});

const expectEqual = <T>(actual: T, expected: T) =>
  expect(actual).toEqual(expected);
