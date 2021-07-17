import { store } from "../infra";

export class KeyboardShortcuts {
  constructor() {
    document.addEventListener("keydown", this.handleKey);
  }

  handleKey = (e: KeyboardEvent) => {
    if (e.code === "ArrowDown") store.onKeyDown();
    if (e.code === "ArrowUp") store.onKeyUp();
    if (e.code === "ArrowLeft") store.onKeyLeft();
    if (e.code === "ArrowRight") store.onKeyRight();
    if (e.code === "KeyB" && e.ctrlKey) store.runDiagnostics();
    if (e.key === "2" && e.ctrlKey) {
      e.preventDefault();
      store.switchToSearch();
    }
    if (e.key === "1" && e.ctrlKey) {
      e.preventDefault();
      store.switchToMain();
    }
    if (e.key === "k" && e.ctrlKey) {
      e.preventDefault();
      store.switchToSearchInput();
    }
    if (e.code === "Escape") store.onEscape();

    if (e.code === "Backspace" && e.shiftKey && e.ctrlKey)
      store.removeSelected();
    if (e.code === "F2") store.startRenameSelectedItem();
    if (e.code === "Enter") store.createItemAfterSelected();
    if (e.code === "Tab") {
      e.preventDefault();
    }

    if (e.code === "KeyX") {
      e.preventDefault();
      store.playCurrentItem();
    }
  };
}
