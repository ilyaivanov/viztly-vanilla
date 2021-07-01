import { store } from "./domain";
import { onDownArrow, onUpArrow } from "./domain/actions";
import { renderTree } from "./view/tree";

document.body.append(renderTree());

document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowDown") store.apply(onDownArrow(store.state));
  if (e.code === "ArrowUp") store.apply(onUpArrow(store.state));
  // if (e.code === "ArrowRight") store.startLoadingSelectedItem();
  // if (e.code === "ArrowLeft") store.closeSelected();
});
