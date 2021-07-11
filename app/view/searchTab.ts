import { dom } from "../browser";
import { store, glue } from "../infra";
import { viewTree } from "./itemsTree";

export class SearchTab {
  input = dom.input({
    placeholder: "Search... (ctrl + k)",
    className: "search-tab-input",
    onKeyDown: (e) => {
      if (e.key === "Enter")
        store.searchForVideos((e.currentTarget as HTMLInputElement).value);
    },
  });

  tree: HTMLDivElement;
  el: HTMLDivElement;

  constructor() {
    this.tree = dom.div({ children: [this.renderResults()] });

    this.el = dom.div({
      className: "search-tab",
      children: [this.input, this.tree],
    });

    glue.searchTab = this;
  }

  renderResults = () =>
    store.hasSearchResults()
      ? viewTree("SEARCH")
      : dom.span({ text: "No Results" });

  focusInput = () => this.input.focus();
  blurInput = () => this.input.blur();

  startLoading = () => {
    this.tree.textContent = "Loading...";
  };

  stopLoading = () => {
    dom.removeAllChildren(this.tree);
    this.tree.appendChild(this.renderResults());
  };
}

export const renderSearchTab = () => new SearchTab().el;
