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
export const isLoading = (items: Items, id: string): boolean =>
  !!items[id].isLoading;

export const isNeededToBeLoaded = (items: Items, id: string): boolean =>
  !items[id].isOpen && !items[id].children && !items[id].isLoading;

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

export const getChildren = (items: Items, id: string): string[] =>
  items[id].children || [];

export const assignItem = (
  items: Items,
  id: string,
  mapper: (item: Item) => Partial<Item>
): Items => {
  const item = items[id];
  Object.assign(item, mapper(item));
  return items;
};

export const itemLoaded = (
  items: Items,
  id: string,
  children: Item[]
): Items => {
  const item = items[id];
  delete item.isLoading;
  item.children = children.map((c) => c.id);
  children.forEach((child) => (items[child.id] = child));
  return items;
};

export const getParentId = (items: Items, id: string): string => {
  const i = Object.keys(items).find((key) => {
    const item = items[key];
    return item.children && item.children.indexOf(id) >= 0;
  });

  return i!;
};

const roots = new Set(["HOME", "SEARCH"]);
export const isRoot = (id: string) => roots.has(id);

//helpers

const getContext = (items: Items, id: string): string[] => {
  const parentId = getParentId(items, id);
  return items[parentId].children || [];
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
