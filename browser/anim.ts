const animationSpeedCoefficient = 1;

const animationTimings = {
  expandCollapse: 200,
};

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
      duration:
        (animationTimings.expandCollapse / 2) * animationSpeedCoefficient,
    })
    .addEventListener("finish", () => {
      content.remove();
      newContent.style.removeProperty("height");
      newContent.style.removeProperty("opacity");
      newContent.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration:
          (animationTimings.expandCollapse / 2) * animationSpeedCoefficient,
      });
    });
  container
    .animate(
      [
        { height: `${currentHeight}px` },
        { height: `${newContent.scrollHeight}px` },
      ],
      { duration: animationTimings.expandCollapse * animationSpeedCoefficient }
    )
    .addEventListener("finish", () => {});
};

export const collapse = (container: HTMLElement): Animation => {
  const currentHeight = container.clientHeight;

  return container.animate(
    [{ height: `${currentHeight}px` }, { height: `0px` }],
    {
      duration: animationTimings.expandCollapse * animationSpeedCoefficient,
    }
  );
};
export const expand = (container: HTMLElement): Animation => {
  const currentHeight = container.clientHeight;

  return container.animate(
    [{ height: `0px` }, { height: `${currentHeight}px` }],
    {
      duration: animationTimings.expandCollapse * animationSpeedCoefficient,
    }
  );
};

export const revertAnimations = (elem: HTMLElement) =>
  elem.getAnimations().forEach((animation) => animation.reverse());

export const hasAnimations = (elem: HTMLElement) =>
  elem.getAnimations().length > 0;
