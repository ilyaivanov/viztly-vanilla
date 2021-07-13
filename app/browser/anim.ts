import { timings } from "../designSystem/timings";

export const crossFade = (
  container: HTMLElement,
  content: HTMLElement,
  newContent: HTMLElement
) => {
  const currentHeight = container.clientHeight;
  newContent.style.height = "0px";
  newContent.style.opacity = "0";
  container.appendChild(newContent);

  content
    .animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: timings.itemExpand / 2,
    })
    .addEventListener("finish", () => {
      content.remove();
      newContent.style.removeProperty("height");
      newContent.style.removeProperty("opacity");
      newContent.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: timings.itemExpand / 2,
      });
    });
  container
    .animate(
      [
        { height: `${currentHeight}px` },
        { height: `${newContent.scrollHeight}px` },
      ],
      { duration: timings.itemExpand }
    )
    .addEventListener("finish", () => {});
};

export const collapse = (container: HTMLElement): Animation => {
  const currentHeight = container.clientHeight;

  return container.animate(
    [
      { height: `${currentHeight}px`, opacity: 1 },
      { height: `0px`, opacity: 0 },
    ],
    { duration: timings.itemCollapse }
  );
};
export const expand = (container: HTMLElement): Animation => {
  const currentHeight = container.clientHeight;

  return container.animate(
    [
      { height: `0px`, opacity: 0 },
      { height: `${currentHeight}px`, opacity: 1 },
    ],
    { duration: timings.itemExpand }
  );
};

export const hideViaOpacity = (container: Element): Animation => {
  return container.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration: timings.itemCollapse,
  });
};

export const showViaOpacity = (container: Element): Animation => {
  return container.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: timings.itemExpand,
  });
};

export const hasAnimations = (elem: HTMLElement) =>
  elem.getAnimations().length > 0;

export const revertAnimations = (elem: HTMLElement | undefined) => {
  if (!elem) return false;

  if (hasAnimations(elem)) {
    elem.getAnimations().forEach((animation) => animation.reverse());
    return true;
  }
  return false;
};
