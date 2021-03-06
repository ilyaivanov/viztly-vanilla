type SimpleEvent<T> = { type: T };
type EventWithPayload<T, TPayload> = { type: T; payload: TPayload };

type DomainEvent =
  | SimpleEvent<"search-tab-visibility-change">
  | SimpleEvent<"search-loading">
  | SimpleEvent<"run-diagnostics">
  | EventWithPayload<"search-find-videos", string>
  | EventWithPayload<"item-open", string>
  | EventWithPayload<"item-close", string>
  | EventWithPayload<"item-play", Item>
  | EventWithPayload<"item-startRename", string>
  | EventWithPayload<"item-insertAfter", { itemId: string; folder: Item }>
  | EventWithPayload<"item-insertBefore", { itemId: string; folder: Item }>
  | EventWithPayload<"item-insertInside", { itemId: string; folder: Item }>
  | EventWithPayload<
      "item-mouse-move-during-drag",
      { itemUnder: Item; e: MouseEvent }
    >
  | SimpleEvent<"item-mouse-up-during-drag">
  | EventWithPayload<"item-mouse-down", Item>
  | EventWithPayload<
      "item-removed",
      { itemId: string; itemParentId: string; fireAnimation?: boolean }
    >
  | EventWithPayload<"item-select", string>
  | EventWithPayload<"item-loaded", string>
  | EventWithPayload<"item-start-loading", string>;
