const appendChildren = (elem: Element, children: Element[]) =>
  children.forEach((child) => elem.appendChild(child));

export const removeAllChildren = (elem: Element) => {
  while (elem.firstChild) elem.firstChild.remove();
};

export const setChildren = (elem: Element, children: Element[]) => {
  removeAllChildren(elem);
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
  id?: string;
  onKeyDown?: (e: KeyboardEvent) => void;
};

export const div = ({ className, children, id }: DivProps) => {
  const elem = document.createElement("div");

  if (className) elem.classList.add(className);
  if (id) elem.id = id;
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

type InputProps = {
  className?: ClassName;
  value?: string;
  placeholder?: string;
  onKeyDown?: (e: KeyboardEvent) => void;
};

export const input = (props: InputProps) => {
  const elem = document.createElement("input");
  if (props.value) elem.value = props.value;
  if (props.placeholder) elem.placeholder = props.placeholder;
  if (props.className) elem.classList.add(props.className);
  if (props.onKeyDown) elem.addEventListener("keydown", props.onKeyDown);

  return elem;
};
