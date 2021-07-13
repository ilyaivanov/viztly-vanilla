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
        type: "folder",
        isOpen: true,
        children: ["first item", "2"],
      },
      "first item": {
        id: "first item",
        title: "first item",
        type: "folder",
        isOpen: true,
        children: ["first item child", "1.2"],
      },
      2: {
        id: "2",
        title: "2",
        type: "folder",
        children: [],
      },
      "first item child": {
        id: "first item child",
        title: "first item child",
        type: "folder",
        children: [],
      },
      "1.2": {
        id: "1.2",
        title: "1.2",
        type: "folder",
        isOpen: true,
        children: ["1.2.1"],
      },
      "1.2.1": {
        id: "1.2.1",
        type: "folder",
        title: "1.2.1",
        children: [],
      },
      SEARCH: {
        id: "SEARCH",
        title: "SEARCH",
        type: "folder",
        isOpen: true,
        children: ["s1", "s2"],
      },
      s1: {
        id: "s1",
        type: "folder",
        title: "s1",
        children: [],
      },
      s2: {
        id: "s2",
        type: "folder",
        title: "s2",
        children: [],
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
