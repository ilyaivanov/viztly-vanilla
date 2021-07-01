// import { ItemViewInterface } from "../appEventsTypes";

// export const buildItems = (template: string): Items => {
//   const rows = template.split("\n").filter((s) => s.trim() !== "");

//   const res: Items = {};
//   const parents: Level[] = [];

//   const currentParent = () => parents[parents.length - 1];

//   const assignChildren = (childId: string) => {
//     const parent = currentParent();
//     if (parent) {
//       const item = res[parent.id];
//       if (item.type !== "YTvideo") item.children.push(childId);
//     }
//   };

//   let currentLevel = getLevel(rows[0]);
//   for (let i = 0; i < rows.length; i++) {
//     const row = rows[i];
//     const level = getLevel(row);
//     const id = assignItem(row, res);

//     if (level == currentLevel) {
//       parents.pop();
//       assignChildren(id);
//       parents.push({ level, id });
//     } else if (level > currentLevel) {
//       assignChildren(id);
//       currentLevel = level;
//       parents.push({ level, id });
//     } else if (level < currentLevel) {
//       let last = parents.pop();
//       while (last && last.level > level) {
//         last = parents.pop();
//       }
//       currentLevel = level;
//       assignChildren(id);
//       parents.push({ level, id });
//     }
//   }
//   return res;
// };

// type Level = { id: string; level: number };
// const assignItem = (row: string, items: Items): string => {
//   const parts = row.trim().split(" ");
//   const title = parts[0];
//   const options = parts.slice(1).reduce(
//     (options, key) => ({
//       ...options,
//       [key]: true,
//     }),
//     {}
//   );

//   const uppercaseIds: Record<string, boolean> = {
//     HOME: true,
//     SEARCH: true,
//   };
//   const id = uppercaseIds[title.toUpperCase()] ? title.toUpperCase() : title;
//   items[id] = mapItem(id, title, options);
//   return id;
// };

// const mapItem = (
//   id: string,
//   title: string,
//   options: Record<string, string>
// ): Item => {
//   if (id === "SEARCH")
//     return {
//       id,
//       title,
//       type: "search",
//       searchTerm: "",
//       children: [],
//     };
//   else
//     return {
//       id,
//       title,
//       type: "folder",
//       isOpen: !options["-closed"],
//       children: [],
//     };
// };

// const getLevel = (s: string) => {
//   let level = 0;
//   for (let index = 0; index < s.length; index++) {
//     if (s[index] === " ") level += 1;
//     else break;
//   }
//   return level;
// };

// export const createItemViewMock = (id: string): ItemViewInterface => ({
//   id,
//   select: jest.fn(),
//   open: jest.fn(),
//   close: jest.fn(),
//   unselect: jest.fn(),
//   childrenCountUpdated: jest.fn(),
//   enterRenameMode: jest.fn(),
//   exitRenameMode: jest.fn(),
//   insertItemAfter: jest.fn(),
//   insertItemAsFirstChild: jest.fn(),
//   itemLoaded: jest.fn(),
//   remove: jest.fn(),
// });
