type ItemCommand = "select" | "unselect";
type ItemCommands = Record<ItemCommand, () => void>;

type Command = ItemCommand;
type CommandListener = Partial<Record<Command, () => void>>;

type Items = Record<string, Item>;

type Item = {
  id: string;
  title: string;
  children?: string[];
};
