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

export function getNextBelow(items: Items, itemId: string): string | undefined {
  const children = items[itemId].children;
  if (isOpen(items, itemId) && children && children.length > 0) {
    return children[0];
  } else {
    const followingItem = getFollowingItem(items, itemId);
    if (followingItem) {
      return followingItem;
    } else {
      let parentId = getParentId(items, itemId); //?
      while (!isRoot(parentId) && parentId && isLast(items, parentId)) {
        parentId = getParentId(items, parentId);
      }
      if (parentId && !isRoot(parentId)) {
        const following = getFollowingItem(items, parentId);
        if (following) return following;
      }
    }
  }
}

export const getItemAbove = (items: Items, id: string): string | undefined => {
  const context = getContext(items, id);
  const index = context.indexOf(id);
  if (index > 0) {
    const prevItemId = context[index - 1];
    return isOpen(items, prevItemId)
      ? getLastNestedItem(items, prevItemId)
      : prevItemId;
  } else {
    const parentId = getParentId(items, id);
    if (!isRoot(parentId)) return parentId;
  }
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

//helpers

const getParentId = (items: Items, id: string): string => {
  const i = Object.keys(items).find((key) => {
    const item = items[key];
    return item.children && item.children.indexOf(id) >= 0;
  });

  return i!;
};

const getContext = (items: Items, id: string): string[] => {
  const parentId = getParentId(items, id);
  return items[parentId].children || [];
};

const getParent = (items: Items, id: string): Item | undefined => {
  const parentId = getParentId(items, id);
  if (parentId) return items[parentId];
};

const getFollowingItem = (items: Items, id: string): string | undefined => {
  const context = getContext(items, id);
  const index = context.indexOf(id);
  if (index < context.length - 1) {
    return context[index + 1];
  }
};

const isLast = (items: Items, id: string): boolean => {
  const context = getContext(items, id);
  return context.indexOf(id) === context.length - 1;
};

const getLastNestedItem = (items: Items, id: string): string => {
  if (isOpen(items, id) && getChildren(items, id).length > 0) {
    const children = getChildren(items, id);
    return getLastNestedItem(items, children[children.length - 1]);
  }
  return id;
};

const getChildren = (items: Items, id: string): string[] =>
  items[id].children || [];

const roots = new Set(["HOME", "SEARCH"]);
const isRoot = (id: string) => roots.has(id);
