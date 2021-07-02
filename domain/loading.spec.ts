import actions from "./actions";
import * as items from "./items";
import { buildItems } from "./itemsBuilder";

it("having an empty folder which needs to be loaded when moving right dispatches a loading command", () => {
  const state: AppState = {
    items: buildItems(`
          HOME
            1
            2
        `),
    selectedItem: "1",
  };
  const { nextState, commands } = actions.onRightArrow(state);
  expect(items.isOpen(nextState.items, "1")).toEqual(true);
  expect(items.isLoading(nextState.items, "1")).toEqual(true);
  expectEqual(commands, { startLoading: "1", open: "1" });
});

it("when items loaded for an item they are assigned as children ", () => {
  const state: AppState = {
    items: buildItems(`
            HOME
              1
              2
          `),
    selectedItem: "1",
  };
  const expectedState: AppState = {
    items: buildItems(`
            HOME
              1
                1.1
                1.2
              2
          `),
    selectedItem: "1",
  };
  const { nextState, commands } = actions.itemsLoaded(state, "1", [
    folder("1.1"),
    folder("1.2"),
  ]);
  expectEqual(nextState, expectedState);
  expect(items.isLoading(nextState.items, "1")).toEqual(false);
  expectEqual(commands, { stopLoading: "1" });
});

const expectEqual = <T>(received: T, expected: T) =>
  expect(received).toEqual(expected);

const folder = (id: string): Item => ({
  id,
  title: id,
});
