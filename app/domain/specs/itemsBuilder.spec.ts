import { buildState } from "./itemsBuilder";

it("building items", () => {
  const items = buildState(`
    HOME
      first item -open -mainSelected
        first item child
        1.2  -open
          1.2.1
      2
    SEARCH
      s1 -searchSelected
      s2 
    `);

  const expected: AppState = {
    items: {
      HOME: {
        id: "HOME",
        title: "HOME",
        isOpen: true,
        children: ["first item", "2"],
      },
      "first item": {
        id: "first item",
        title: "first item",
        isOpen: true,
        children: ["first item child", "1.2"],
      },
      2: {
        id: "2",
        title: "2",
      },
      "first item child": {
        id: "first item child",
        title: "first item child",
      },
      "1.2": {
        id: "1.2",
        title: "1.2",
        isOpen: true,
        children: ["1.2.1"],
      },
      "1.2.1": {
        id: "1.2.1",
        title: "1.2.1",
      },
      SEARCH: {
        id: "SEARCH",
        title: "SEARCH",
        isOpen: true,
        children: ["s1", "s2"],
      },
      s1: {
        id: "s1",
        title: "s1",
      },
      s2: {
        id: "s2",
        title: "s2",
      },
    },
    mainSelectedItem: "first item",
    searchSelectedItem: "s1",
    uiState: {
      areaFocused: "main",
      isSearchLoading: false,
      isSearchVisible: false,
    },
  };
  expect(items).toEqual(expected);
});
