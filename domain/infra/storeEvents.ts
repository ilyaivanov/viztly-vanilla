type Subscriptiuon = Record<string, (() => void)[]>;
export default class StoreEvents {
  private cbs: Partial<Record<StoreEvent, Subscriptiuon>> = {};

  on = (event: StoreEvent, cb: () => void) =>
    this.onKeyed(event, "GENERAL", cb);

  onKeyed = (event: StoreEvent, id: string, cb: () => void) => {
    if (!this.cbs[event]) this.cbs[event] = {};

    const sub = this.cbs[event]!;
    if (!sub[id]) sub[id] = [] as unknown as (() => void)[];

    sub[id].push(cb);
  };

  clearKeyed = (event: StoreEvent, id: string) => {
    const sub = this.cbs[event];
    if (sub) sub[id] = [];
  };

  clear = (event: StoreEvent) => this.clearKeyed(event, "GENERAL");

  trigger = (event: StoreEvent) => this.triggerKeyed(event, "GENERAL");

  triggerKeyed = (event: StoreEvent, id: string) => {
    const sub = this.cbs[event];
    if (sub) {
      const subs = sub[id];
      if (subs) subs.forEach((cb) => cb());
    }
  };

  getEventsCount = () => {
    const totalSubs = (sub: Subscriptiuon) =>
      Object.values(sub).reduce(
        (total, listeners) => total + listeners.length,
        0
      );

    return Object.fromEntries(
      Object.entries(this.cbs).map(([key, value]) => [key, totalSubs(value)])
    );
  };
}
