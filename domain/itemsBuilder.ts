export const buildItems = (template: string): Items => {
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
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const level = getLevel(row);
    const id = assignItem(row, res);

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
  return res;
};

type Level = { id: string; level: number };
const assignItem = (row: string, items: Items): string => {
  const parts = row.trim().split(" ");
  const title = parts[0];
  const options = parts.slice(1).reduce(
    (options, key) => ({
      ...options,
      [key]: true,
    }),
    {}
  );

  const id = title;
  items[id] = mapItem(id, title, options);
  return id;
};

const roots = new Set(["HOME", "SEARCH"]);

const mapItem = (
  id: string,
  title: string,
  options: Record<string, string>
): Item => {
  const item: Item = {
    id,
    title,
  };

  if (roots.has(id) || options["-open"]) item.isOpen = true;
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
