type SimpleEvent<T> = { type: T };
type EventWithPayload<T, TPayload> = { type: T; payload: TPayload };

type DomainEvent =
  | SimpleEvent<"search-tab-visibility-change">
  | SimpleEvent<"search-loading">
  | SimpleEvent<"run-diagnostics">
  | EventWithPayload<"search-find-videos", string>
  | EventWithPayload<"item-open", string>
  | EventWithPayload<"item-close", string>
  | EventWithPayload<"item-select", string>
  | EventWithPayload<"item-loaded", string>
  | EventWithPayload<"item-start-loading", string>;
