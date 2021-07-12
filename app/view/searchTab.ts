import { dom, style } from "../browser";
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
      classNames: ["search-tab"],
      classMap: { "search-tab_hidden": !store.isSearchVisible() },
      children: [this.input, this.tree],
    });

    glue.searchTab = this;
  }

  renderResults = () =>
    store.hasSearchResults()
      ? viewTree("SEARCH")
      : dom.span({ text: "No Results" });

  focusInput = () => this.input.focus({ preventScroll: true });
  blurInput = () => this.input.blur();

  startLoading = () => {
    this.tree.textContent = "Loading...";
  };

  stopLoading = () => {
    dom.removeAllChildren(this.tree);
    this.tree.appendChild(this.renderResults());
  };

  show = () => dom.removeClass(this.el, "search-tab_hidden");

  hide = () => dom.addClass(this.el, "search-tab_hidden");
}

export const renderSearchTab = () => new SearchTab().el;

style.class("search-tab", { transition: "margin-right 200ms" });
style.class("search-tab_hidden", { marginRight: "-100%" });
