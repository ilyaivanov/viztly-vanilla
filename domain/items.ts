export const initial: Items = {
  HOME: {
    id: "HOME",
    title: "HOME",
    children: ["1", "2", "3", "4", "5"],
  },
  "1": {
    id: "1",
    title: "First",
  },
  "2": {
    id: "2",
    title: "Second",
  },
  "3": {
    id: "3",
    title: "Third",
  },
  "4": {
    id: "4",
    title: "Four",
  },
  "5": {
    id: "5",
    title: "Five",
  },
};

export const getRootItems = (items: Items): Item[] => {
  const children = items["HOME"].children;
  if (children) return children.map((id) => items[id]);
  else return [];
};
