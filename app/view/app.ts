import { style, dom, css } from "../browser";
import { viewTree } from "./itemsTree";
import { Player } from "./player";
import { renderSearchTab } from "./searchTab";

export const renderApp = () =>
  dom.div({
    className: "app",
    children: [
      dom.div({
        classNames: ["tab", "main-tab"],
        children: [viewTree("HOME")],
      }),
      renderSearchTab(),
      new Player().el,
    ],
  });

style.class("app", {
  color: "white",
  backgroundColor: "#1E1E1E",
  height: "calc(100vh - 49px)",
  width: "100vw",
  display: "flex",
  flexDirection: "row",
  overflow: "hidden",
});

style.class("tab", {
  flex: 1,
  overflowY: "overlay",
  paddingBottom: "50vh",
});

css.createScrollStyles("tab", {
  scrollbar: {
    width: 8,
  },
  thumb: {
    backgroundColor: "#424242",
  },
});

style.class("search-tab", {
  borderLeft: "1px solid #444444",
  flex: 1,
});

style.class("search-tab_hidden", { marginRight: "-100%" });

style.tag("body", { margin: 0 });

style.tag("body", {
  fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
});
