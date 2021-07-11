import { style, dom } from "../browser";
import { viewTree } from "./itemsTree";
import { renderSearchTab } from "./searchTab";

export const renderApp = () =>
  dom.div({
    className: "app",
    children: [
      dom.div({
        className: "main-tab",
        children: [viewTree("HOME")],
      }),
      renderSearchTab(),
      dom.div({
        className: "keyboard-label",
        children: [dom.span({ text: "Keyboard Only" })],
      }),
    ],
  });

style.class("app", {
  color: "white",
  backgroundColor: "#1E1E1E",
  height: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "row",
});

style.class("main-tab", {
  flex: 1,
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

style.class("keyboard-label", {
  position: "fixed",
  bottom: 10,
  color: "darkGrey",
  left: "calc(50vw - 68px)",
});
