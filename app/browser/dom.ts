export const insert = (
  elem: Element,
  target: InsertPosition,
  elemToInsert: Element
) => elem.insertAdjacentElement(target, elemToInsert);

export const appendChildren = (elem: Element, children: Node[]) =>
  children.forEach((child) => elem.appendChild(child));

export const removeAllChildren = (elem: Element) => {
  while (elem.firstChild) elem.firstChild.remove();
};

export const setChildren = (elem: Element, children: Element[]) => {
  removeAllChildren(elem);
  children.forEach((child) => elem.appendChild(child));
};

export const fragment = (children: Element[]) => {
  const frag = document.createDocumentFragment();
  children.forEach((child) => frag.appendChild(child));
  return frag;
};

export type ClassMap = Partial<Record<ClassName, boolean>>;
export type ClassDefinitions = {
  className?: ClassName;
  classNames?: ClassName[];
  classMap?: ClassMap;
};

export const assignClasses = <T extends Element>(
  elem: T,
  classes: ClassDefinitions
): T => {
  const { classMap, className, classNames } = classes;
  if (classMap)
    Object.entries(classMap).map(([className, isSet]) =>
      toggleClass(elem, className as ClassName, isSet)
    );
  if (className) elem.classList.add(className);
  if (classNames) classNames.forEach((cs) => elem.classList.add(cs));
  return elem;
};

export const addClass = (elem: Element, className: ClassName) =>
  elem.classList.add(className);

export const removeClass = (elem: Element, className: ClassName) =>
  elem.classList.remove(className);

export const toggleClass = (
  elem: Element,
  className: ClassName,
  isSet?: boolean
) => elem.classList.toggle(className, isSet);

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

type Events = {
  onKeyDown?: (e: KeyboardEvent) => void;
  onClick?: (e: MouseEvent) => void;
};
type DivProps = {
  children?: Node[];
  id?: string;
} & ClassDefinitions &
  Events;

export const div = (props: DivProps) => {
  const elem = document.createElement("div");

  const { children, id } = props;
  assignClasses(elem, props);
  assignElementEvents(elem, props);
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

type SpanProps = {
  text: string;
} & ClassDefinitions;

export const span = (props: SpanProps) => {
  const elem = document.createElement("span");
  assignClasses(elem, props);

  elem.textContent = props.text;

  return elem;
};

type InputProps = {
  value?: string;
  placeholder?: string;
} & ClassDefinitions &
  Events;

export const input = (props: InputProps) => {
  const elem = document.createElement("input");
  assignClasses(elem, props);
  if (props.value) elem.value = props.value;
  if (props.placeholder) elem.placeholder = props.placeholder;

  assignElementEvents(elem, props);

  return elem;
};

const assignElementEvents = (elem: HTMLElement, props: Events) => {
  if (props.onKeyDown) elem.addEventListener("keydown", props.onKeyDown);
  if (props.onClick) elem.addEventListener("click", props.onClick);
};
