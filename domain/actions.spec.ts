import actions from "./actions";

describe("having two items", () => {
  const getState = (): AppState => ({
    items: {
      HOME: folder("HOME", ["1", "2"]),
      "1": folder("1"),
      "2": folder("2"),
    },
    selectedItem: "",
  });

  it("with first selected going down selects second item", () => {
    const state = getState();
    state.selectedItem = "1";
    expect(actions.onDownArrow(state).nextState.selectedItem).toBe("2");
  });

  it("with second selected going up selects first item", () => {
    const state = getState();
    state.selectedItem = "2";
    expect(actions.onUpArrow(state).nextState.selectedItem).toBe("1");
  });
});

const folder = (id: string, children?: string[]): Item => ({
  id,
  title: id,
  children,
});
