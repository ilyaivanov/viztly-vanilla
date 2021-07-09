export default class Store {
  state: MyState = {
    items: [
      { id: "1", title: "First" },
      { id: "2", title: "Second" },
      { id: "3", title: "Third" },
    ],
    itemsShown: true,
  };

  q = {
    isVisible: () => this.state.itemsShown,
  };

  toggleItems = () => {
    const [state, commands] = toggleItems(this.state);
    this.state = state;
    commands.forEach((command) => this.dispatchComand(command));
  };

  itemClicked = (id: string) => {
    const [state, commands] = onItemClick(this.state, id);
    this.state = state;
    console.log(state);
    commands.forEach((command) => {});
  };

  //commands
  events: Partial<Record<CommandName, Subscription[]>> = {};
  dispatchComand = (command: MyCommnad) => {
    const arr = this.events[command.type];
    if (arr)
      arr.forEach((subscription) => subscription.cb(subscription.element));
  };
  sub = (commands: Partial<Record<CommandName, CB>>, element: HTMLElement) => {
    Object.entries(commands).forEach(([c, cb]) => {
      const commandName = c as CommandName;
      if (!this.events[commandName]) this.events[commandName] = [];
      this.events[commandName]!.push({ cb, element });
    });
  };
}

const onItemClick = (state: MyState, itemId: string): MyActionResult => {
  const item = state.items.find((item) => item.id == itemId)!;
  item.isDone = !item.isDone;
  return [state, [{ type: "itemDoneChanged" }]];
};

const toggleItems = (state: MyState): MyActionResult => [
  {
    ...state,
    itemsShown: !state.itemsShown,
  },
  [{ type: "itemsVisibilityChanged" }],
];

export const store = new Store();
