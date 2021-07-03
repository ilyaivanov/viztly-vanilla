import { dom, style } from "./browser";
import { actions } from "./domain";
import { renderTree } from "./view/tree";

const renderApp = () =>
  dom.div({
    className: "app",
    children: [
      dom.div({
        className: "main-tab",
        children: [renderTree("HOME")],
      }),
      dom.div({
        className: "search-tab",
        children: [renderTree("SEARCH")],
      }),
    ],
  });

document.body.append(renderApp());

//trigger selection on main tab
actions.focusOn("main");

document.addEventListener("keydown", (e) => {
  //preventing scroll movement
  if (e.code.startsWith("Arrow")) e.preventDefault();

  if (e.code === "ArrowDown") actions.onArrowDown();
  if (e.code === "ArrowUp") actions.onArrowUp();
  if (e.code === "ArrowRight") actions.onArrowRight();
  if (e.code === "ArrowLeft") actions.onArrowLeft();
  if (e.key === "2" && e.ctrlKey) {
    e.preventDefault();
    actions.focusOn("search");
  }
  if (e.key === "1" && e.ctrlKey) {
    e.preventDefault();
    actions.focusOn("main");
  }
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
