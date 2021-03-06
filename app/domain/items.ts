export const getRootItems = (items: Items): Item[] =>
  getChildren(items, "HOME");

export const mapRootItems = <T>(items: Items, mapper: (item: Item) => T): T[] =>
  mapChildrenIfOpen(items, "HOME", mapper);

export const setChildren = (items: Items, id: string, children: Item[]) => {
  children.forEach((item) => (items[item.id] = item));
  const item = items[id];
  if (item.type !== "YTvideo") item.children = children.map((item) => item.id);
};

export const getChildrenIds = (items: Items, id: string): string[] => {
  const item = items[id];
  if (item && "children" in item) return item.children;
  return [];
};

export const getChildren = (items: Items, id: string): Item[] =>
  getChildrenIds(items, id).map((id) => items[id]);

export function getNextBelow(items: Items, itemId: string): string | undefined {
  const children = getChildrenIds(items, itemId);
  if (isOpen(items, itemId) && children && children.length > 0) {
    return children[0];
  } else {
    const followingItem = getFollowingItem(items, itemId);
    if (followingItem) {
      return followingItem;
    } else {
      let parentId = getParentId(items, itemId);
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

export const mapChildrenIfOpen = <T>(
  items: Items,
  id: string,
  mapper: (item: Item) => T
): T[] => (isOpen(items, id) ? getChildren(items, id).map(mapper) : []);

export const traverseOpenChildren = (
  items: Items,
  itemId: string,
  action: Action<Item>
) => {
  const traverseChildren = (children: string[]) => {
    children.forEach((id) => {
      action(items[id]);
      if (isOpen(items, id)) {
        const subchilds = getChildrenIds(items, id);
        if (subchilds) traverseChildren(subchilds);
      }
    });
  };
  const children = getChildrenIds(items, itemId);
  if (children) traverseChildren(children);
};

export const traverseAllChildren = (
  items: Items,
  itemId: string,
  action: Action<Item>
) => {
  const traverseChildren = (children: string[]) => {
    children.forEach((id) => {
      action(items[id]);
      const subchilds = getChildrenIds(items, id);
      if (subchilds) traverseChildren(subchilds);
    });
  };
  const children = getChildrenIds(items, itemId);
  if (children) traverseChildren(children);
};

export const insertItemAfter = (items: Items, id: string, item: Item) => {
  const context = getContext(items, id);
  const index = context.indexOf(id);

  context.splice(index + 1, 0, item.id);
  items[item.id] = item;
  return items;
};
export const insertItemBefore = (items: Items, id: string, item: Item) => {
  const context = getContext(items, id);
  const index = context.indexOf(id);

  context.splice(index, 0, item.id);
  items[item.id] = item;
  return items;
};
export const insertItemInside = (items: Items, id: string, item: Item) => {
  const itemToInsertInside = items[id];
  if (!isVideo(itemToInsertInside)) {
    itemToInsertInside.children = [item.id].concat(itemToInsertInside.children);
  }
  items[item.id] = item;
  return items;
};
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
  if (isRemoteFolder(item)) delete item.isLoading;
  assignChildren(items, id, children);
  return items;
};

export const getParentId = (items: Items, id: string): string => {
  const i = Object.keys(items).find((itemId) => {
    return getChildrenIds(items, itemId).indexOf(id) >= 0;
  });

  return i!;
};

const roots = new Set(["HOME", "SEARCH"]);
export const isRoot = (id: string) => roots.has(id);
export const getRootFor = (items: Items, itemId: string): string => {
  let result = itemId;
  let parent = getParentId(items, result);
  while (parent) {
    result = parent;
    parent = getParentId(items, result);
  }
  return result;
};
//helpers

export const getContext = (items: Items, id: string): string[] => {
  const parentId = getParentId(items, id);
  return getChildrenIds(items, parentId);
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
    const children = getChildrenIds(items, id);
    return getLastNestedItem(items, children[children.length - 1]);
  }
  return id;
};

const assignChildren = (items: Items, id: string, newChildren: Item[]) => {
  const item = items[id];
  if (item.type !== "YTvideo") item.children = newChildren.map((c) => c.id);
  newChildren.forEach((child) => (items[child.id] = child));
};

export const isOpen = (items: Items, id: string): boolean => {
  const item = items[id];
  return isContainer(item) ? !!item.isOpen : false;
};

export const isLoading = (items: Items, id: string): boolean => {
  const item = items[id];
  return isRemoteFolder(item) ? !!item.isLoading : false;
};

export const isNeededToBeLoaded = (item: Item): boolean =>
  isRemoteFolder(item) ? !item.isLoading && item.children.length === 0 : false;

export const isEmpty = (items: Items, itemId: string) =>
  getChildrenIds(items, itemId).length === 0;

export const hasImage = (item: Item): boolean =>
  "image" in item || "videoId" in item;

export const getPreviewImage = (item: Item): string => {
  if ("videoId" in item)
    return `https://i.ytimg.com/vi/${item.videoId}/mqdefault.jpg`;
  else if ("image" in item) return item.image;
  else return "";
};

export const isVideo = (item: Item): item is YoutubeVideo =>
  item.type === "YTvideo";
export const isPlaylist = (item: Item): item is YoutubePlaylist =>
  item.type === "YTplaylist";
export const isChannel = (item: Item): item is YoutubeChannel =>
  item.type === "YTchannel";
export const isRemoteFolder = (
  item: Item
): item is YoutubePlaylist | YoutubeChannel =>
  item.type === "YTchannel" || item.type === "YTplaylist";

//this predicate is ugly as my freaking bottom
//evidence that Item types needs some rethinking
export const isContainer = (
  item: Item
): item is YoutubePlaylist | YoutubeChannel | Folder | SearchContainer =>
  item.type != "YTvideo";
