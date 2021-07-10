import { dom } from "../browser";
import { store } from "../domain";
import { renderTree } from "./tree";

export const renderSearchTab = () => {
  const input = dom.input({
    placeholder: "Search... (ctrl + k)",
    className: "search-tab-input",
    onKeyDown: (e) => {
      if (e.key === "Enter")
        store.searchForVideos((e.currentTarget as HTMLInputElement).value);
    },
  });

  const tree = dom.div({});

  const renderResults = () =>
    store.hasSearchResults()
      ? renderTree("SEARCH")
      : dom.span({ text: "No Results" });

  store.bindToSearchFocus((isFocused) => {
    console.log(isFocused);
    if (isFocused) input.focus();
    else input.blur();
  });

  store.bindToLoadingState((isLoading) => {
    if (isLoading) {
      tree.textContent = "Loading...";
    } else {
      dom.removeAllChildren(tree);
      tree.appendChild(renderResults());
    }
  });

  const res = dom.div({
    className: "search-tab",
    children: [input, tree],
  });

  return res;
};
