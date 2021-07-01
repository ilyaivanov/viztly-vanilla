import { buildItems } from "./itemsBuilder";

it("building items", () => {
  const items = buildItems(`
    HOME
      1
        1.1
        1.2  -open
          1.2.1
      2
    `);

  const expected: Items = {
    HOME: {
      id: "HOME",
      title: "HOME",
      isOpen: true,
      children: ["1", "2"],
    },
    1: {
      id: "1",
      title: "1",
      children: ["1.1", "1.2"],
    },
    2: {
      id: "2",
      title: "2",
    },
    "1.1": {
      id: "1.1",
      title: "1.1",
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
  };
  expect(items).toEqual(expected);
});
