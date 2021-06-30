const appendChildren = (elem: Element, children: Element[]) =>
  children.forEach((child) => elem.appendChild(child));

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
  text: string;
  style?: Partial<CSSStyleDeclaration>;
}

export const li = ({ text, id, style }: LiProps) => {
  const elem = document.createElement("li");
  elem.textContent = text;
  if (id) elem.id = id;
  Object.assign(elem.style, style);
  return elem;
};
