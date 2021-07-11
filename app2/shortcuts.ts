import { Store } from "./store";

export class KeyboardShortcuts {
  constructor(private store: Store) {
    document.addEventListener("keydown", this.handleKey);
  }

  handleKey = (e: KeyboardEvent) => {
    if (e.code === "ArrowDown") this.store.onKeyDown();
    if (e.code === "ArrowUp") this.store.onKeyUp();
    if (e.code === "ArrowLeft") this.store.onKeyLeft();
    if (e.code === "ArrowRight") this.store.onKeyRight();
    if (e.code === "KeyB" && e.ctrlKey) this.store.runDiagnostics();
  };
}
