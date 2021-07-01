export class CommandsDispatcher {
  views = new Map<Element, CommandListener>();

  registerView = (element: Element, listener: CommandListener) =>
    this.views.set(element, listener);

  sendCommand = (elementId: string, commandName: Command) => {
    const element = document.getElementById(elementId);
    if (element) {
      const commands = this.views.get(element);
      if (commands) {
        const command = commands[commandName];
        if (command) command();
      }
    }
  };
}
