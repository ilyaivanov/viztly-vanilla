import actions from "../actions";
import { buildState } from "./itemsBuilder";

it("having two folder removing second one should place focus on first and remove second", () => {
  const state = buildState(`
    HOME
        first
        second -mainSelected
    `);

  const expectedState = buildState(`
    HOME
        first -mainSelected
`);
  const { events, nextState } = actions.removeSelected(state);
  expectEqual(events, [
    { type: "item-select", payload: "first" },
    {
      type: "item-removed",
      payload: { itemId: "second", itemParentId: "HOME", fireAnimation: true },
    },
  ]);

  expectEqual(nextState, expectedState);
});

it("having two folder removing first one should place focus on second", () => {
  const state = buildState(`
    HOME
        first -mainSelected
        second 
    `);

  const expectedState = buildState(`
    HOME
        second -mainSelected
`);
  const { nextState } = actions.removeSelected(state);

  expectEqual(nextState, expectedState);
});

const expectEqual = <T>(actual: T, expected: T) =>
  expect(actual).toEqual(expected);
