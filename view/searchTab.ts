import { dom } from "../browser";
import { actions, store } from "../domain";
import { renderTree } from "./tree";

export const renderSearchTab = () => {
  const input = dom.input({
    placeholder: "Search... (ctrl + k)",
    className: "search-tab-input",
    onKeyDown: (e) => {
      if (e.key === "Enter")
        actions.searchFor((e.currentTarget as HTMLInputElement).value);
    },
  });
  const commands: SearchCommands = {
    focus: () => input.focus(),
    unfocus: () => input.blur(),
    "start-loading": () => {
      tree.textContent = "Loading...";
    },
    "stop-loading": () => {
      dom.removeAllChildren(tree);
      tree.appendChild(renderTree("SEARCH"));
    },
  };

  const children = store.state.items["SEARCH"].children
    ? [renderTree("SEARCH")]
    : [dom.span({ text: "No Results" })];
  const tree = dom.div({ children });
  const res = dom.div({
    id: "search-tab",
    className: "search-tab",
    children: [input, tree],
  });

  store.registerView(res, commands);
  return res;
};
