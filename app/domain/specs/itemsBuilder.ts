interface BuildResult {
  items: Items;
  mainTabSelectedId: string;
  searchTabSelectedId: string;
}
export const buildItems = (template: string): BuildResult => {
  const rows = template.split("\n").filter((s) => s.trim() !== "");

  const res: Items = {};
  const parents: Level[] = [];

  const currentParent = () => parents[parents.length - 1];

  const assignChildren = (childId: string) => {
    const parent = currentParent();
    if (parent) {
      const item = res[parent.id];
      if (!item.children) item.children = [];
      item.children.push(childId);
    }
  };

  let currentLevel = getLevel(rows[0]);
  let mainSelectedItem = "";
  let searchSelectedItem = "";
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const level = getLevel(row);
    const { id, options } = assignItem(row, res);

    if (options.has("-mainSelected")) {
      if (mainSelectedItem)
        throw new Error(
          `You have set option mainSelected for two or more items: ${mainSelectedItem}, ${id}`
        );
      mainSelectedItem = id;
    }
    if (options.has("-searchSelected")) {
      if (searchSelectedItem)
        throw new Error(
          `You have set option searchSelected for two or more items: ${searchSelectedItem}, ${id}`
        );
      searchSelectedItem = id;
    }

    if (level == currentLevel) {
      parents.pop();
      assignChildren(id);
      parents.push({ level, id });
    } else if (level > currentLevel) {
      assignChildren(id);
      currentLevel = level;
      parents.push({ level, id });
    } else if (level < currentLevel) {
      let last = parents.pop();
      while (last && last.level > level) {
        last = parents.pop();
      }
      currentLevel = level;
      assignChildren(id);
      parents.push({ level, id });
    }
  }
  return {
    items: res,
    mainTabSelectedId: mainSelectedItem,
    searchTabSelectedId: searchSelectedItem,
  };
};

type Level = { id: string; level: number };
const assignItem = (
  row: string,
  items: Items
): { id: string; options: Set<string> } => {
  const firstParamIndex = row.indexOf(" -");
  let title = firstParamIndex == -1 ? row : row.slice(0, firstParamIndex);
  title = title.trim();
  const parts =
    firstParamIndex == -1 ? [] : row.slice(firstParamIndex).trim().split(" ");
  const options = new Set(parts);

  const id = title;
  items[id] = mapItem(id, title, options);
  return { id, options };
};

const roots = new Set(["HOME", "SEARCH"]);

const mapItem = (id: string, title: string, options: Set<string>): Item => {
  const item: Item = {
    id,
    title,
  };

  if (roots.has(id) || options.has("-open")) item.isOpen = true;
  return item;
};

const getLevel = (s: string) => {
  let level = 0;
  for (let index = 0; index < s.length; index++) {
    if (s[index] === " ") level += 1;
    else break;
  }
  return level;
};

export const buildState = (
  items: string,
  uiState?: Partial<UIState>
): AppState => {
  const itemsBuilded = buildItems(items);
  return {
    items: itemsBuilded.items,
    mainSelectedItem: itemsBuilded.mainTabSelectedId,
    searchSelectedItem: itemsBuilded.searchTabSelectedId,
    uiState: {
      areaFocused: "main",
      isSearchLoading: false,
      isSearchVisible: false,
      ...uiState,
    },
  };
};
