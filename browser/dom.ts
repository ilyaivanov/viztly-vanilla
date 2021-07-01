const appendChildren = (elem: Element, children: Element[]) =>
  children.forEach((child) => elem.appendChild(child));

export const setChildren = (elem: Element, children: Element[]) => {
  while (elem.firstChild) elem.firstChild.remove();
  children.forEach((child) => elem.appendChild(child));
};

export const ul = ({ children }: { children: Element[] }) => {
  const elem = document.createElement("ul");
  appendChildren(elem, children);
  return elem;
};

export const ol = ({ children }: { children: Element[] }) => {
  const elem = document.createElement("ol");
  appendChildren(elem, children);
  return elem;
};

interface LiProps {
  id?: string;
  text?: string;
  style?: Partial<CSSStyleDeclaration>;
  children?: Element[];
}

export const li = ({ text, id, children, style }: LiProps) => {
  const elem = document.createElement("li");
  if (text) elem.textContent = text;
  if (id) elem.id = id;
  Object.assign(elem.style, style);
  if (children) appendChildren(elem, children);
  return elem;
};

interface SpanProps {
  text: string;
  children?: Element[];
}

export const span = ({ text, children }: SpanProps) => {
  const elem = document.createElement("span");
  elem.textContent = text;

  return elem;
};
