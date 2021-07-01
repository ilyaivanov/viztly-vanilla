import { store } from "./domain";
import { renderTree } from "./view/tree";

document.body.append(renderTree());

document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowDown") store.onDownArrow();
  if (e.code === "ArrowUp") store.onUpArrow();
  if (e.code === "ArrowRight") store.onRightArrow();
  if (e.code === "ArrowLeft") store.onLeftArrow();
});
