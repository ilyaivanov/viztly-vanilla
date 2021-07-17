import actions from "../actions";
import { buildState } from "./itemsBuilder";

it("droping item before", () => {
  const state = buildState(`
    HOME
        first -mainSelected
        second
        third
    `);

  const expectedState = buildState(`
    HOME
        first -mainSelected
        third
        second
    `);
  const { nextState } = actions.drop(state, {
    itemOver: "second",
    itemUnder: "third",
    placement: "after",
  });
  expect(nextState).toEqual(expectedState);
});
