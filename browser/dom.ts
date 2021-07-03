const appendChildren = (elem: Element, children: Element[]) =>
  children.forEach((child) => elem.appendChild(child));

export const setChildren = (elem: Element, children: Element[]) => {
  while (elem.firstChild) elem.firstChild.remove();
  children.forEach((child) => elem.appendChild(child));
};

type ClassMap = Record<ClassName, boolean>;

export const assignClasses = (elem: Element, map: ClassMap) => {
  Object.entries(map).map(([className, isSet]) => {
    if (isSet) elem.classList.add(className);
    else elem.classList.remove(className);
  });
};

export const addClass = (elem: Element, className: ClassName) =>
  elem.classList.add(className);

export const removeClass = (elem: Element, className: ClassName) =>
  elem.classList.remove(className);

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

type DivProps = {
  className?: ClassName;
  children?: Element[];
};

export const div = ({ className, children }: DivProps) => {
  const elem = document.createElement("div");

  if (className) elem.classList.add(className);
  if (children) appendChildren(elem, children);
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
