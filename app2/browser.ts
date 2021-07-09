import { store } from "./store";

type ULProps = {
  children: Element[];
  commands?: Partial<Record<CommandName, CB>>;
};

export function ul({ children, commands }: ULProps) {
  const elem = document.createElement("ul");
  children.forEach((child) => elem.appendChild(child));
  if (commands) store.sub(commands, elem);
  return elem;
}

type LIProps = {
  text: string;
  onClick?: () => void;
  itemCommands?: Partial<Record<CommandName, CB>>;
};
export function li(props: LIProps) {
  const elem = document.createElement("li");
  const { text, onClick } = props;
  elem.textContent = text;
  if (onClick) elem.addEventListener("click", onClick);
  return elem;
}

export function removeAllChildren(elem: Element) {
  while (elem.firstChild) {
    elem.firstChild.remove();
  }
}

export function appendAll(elem: Element, children: Element[]) {
  children.forEach((child) => elem.appendChild(child));
}

type ButtonProps = {
  text: string;
  onClick?: () => void;
  commands?: Partial<Record<CommandName, CB>>;
};
export function button(props: ButtonProps) {
  const elem = document.createElement("button");
  const { text, onClick, commands } = props;
  elem.textContent = text;
  if (onClick) elem.addEventListener("click", onClick);
  if (commands) store.sub(commands, elem);
  return elem;
}
