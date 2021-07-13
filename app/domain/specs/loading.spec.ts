import actions from "../actions";
import * as items from "../items";
import { buildState } from "./itemsBuilder";

//empty folder is not loadable, only playlists, channels and partially videos are
//I need to update itemsBuilder to support playlists and channels in order to make this test ok
xit("having an empty folder which needs to be loaded when moving right dispatches a loading command", () => {
  const state: AppState = buildState(`
      HOME
        1 -mainSelected
        2
    `);
  const { nextState, events: commands } = actions.onRightArrow(state);
  expect(items.isOpen(nextState.items, "1")).toEqual(true);
  expect(items.isLoading(nextState.items, "1")).toEqual(true);
  expectEqual(commands, [
    { type: "item-open", payload: "1" },
    { type: "item-start-loading", payload: "1" },
  ]);
});

it("when items loaded for an item they are assigned as children ", () => {
  const state: AppState = buildState(`
    HOME
      1 -mainSelected
      2
  `);

  const expectedState: AppState = buildState(`
    HOME
      1 -mainSelected
        1.1
        1.2
      2
  `);

  const { nextState, events: commands } = actions.itemsLoaded(state, "1", [
    folder("1.1"),
    folder("1.2"),
  ]);

  expectEqual(nextState, expectedState);
  expect(items.isLoading(nextState.items, "1")).toEqual(false);
  expectEqual(commands, [{ type: "item-loaded", payload: "1" }]);
});

const expectEqual = <T>(received: T, expected: T) =>
  expect(received).toEqual(expected);

const folder = (id: string): Item => ({
  id,
  title: id,
  type: "folder",
  children: [],
});
