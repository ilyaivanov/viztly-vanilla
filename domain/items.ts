export const initial: Items = {
  HOME: {
    id: "HOME",
    title: "HOME",
    isOpen: true,
    children: ["1", "2", "3", "4", "5"],
  },
  "1": {
    id: "1",
    title: "First",
    children: ["1.1", "1.2", "1.3"],
    isOpen: true,
  },
  "1.1": {
    id: "1.1",
    title: "First.1",
  },
  "1.2": {
    id: "1.2",
    title: "First.1",
  },
  "1.3": {
    id: "1.3",
    title: "First.3",
    children: ["1.3.1"],
    isOpen: true,
  },
  "1.3.1": {
    id: "1.3.1",
    title: "First.3.1",
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

export const mapRootItems = <T>(items: Items, mapper: (item: Item) => T): T[] =>
  mapChildrenIfOpen(items, "HOME", mapper);

export const getRandomItems = (): Item[] => {
  const length = Math.floor(Math.random() * 8 + 4);
  const randomItem = (): Item => ({
    id: Math.random() + "",
    title: `Some Item (${Math.floor(Math.random() * 100)})`,
  });
  return Array.from(new Array(length)).map(randomItem);
};

export const setChildren = (items: Items, id: string, children: Item[]) => {
  children.forEach((item) => (items[item.id] = item));
  items[id].children = children.map((item) => item.id);
};

export const getNextBelow = (items: Items, id: string): string | undefined => {
  const children = items[id].children;
  if (isOpen(items, id) && children && children.length > 0) return children[0];
  else {
    const context = getContext(items, id);
    const index = context.indexOf(id);
    if (index < context.length - 1) return context[index + 1];
  }
};

export const getItemAbove = (items: Items, id: string): string | undefined => {
  const context = getContext(items, id);
  const index = context.indexOf(id);
  if (index > 0) return context[index - 1];
};

const getParentId = (items: Items, id: string): string => {
  const i = Object.keys(items).find((key) => {
    const item = items[key];
    return item.children && item.children.indexOf(id) >= 0;
  });

  return i!;
};

const getContext = (items: Items, id: string): string[] => {
  const parent = getParentId(items, id);
  return items[parent].children || [];
};

export const isOpen = (items: Items, id: string): boolean => !!items[id].isOpen;

export const mapChildrenIfOpen = <T>(
  items: Items,
  id: string,
  mapper: (item: Item) => T
): T[] => {
  if (isOpen(items, id)) {
    const children = items[id].children;
    if (children) return children.map((childId) => mapper(items[childId]));
    return [];
  } else return [];
};
