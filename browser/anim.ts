const animationSpeedCoefficient = 1;
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
      duration: 100 * animationSpeedCoefficient,
    })
    .addEventListener("finish", () => {
      content.remove();
      newContent.style.removeProperty("height");
      newContent.style.removeProperty("opacity");
      newContent.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 100 * animationSpeedCoefficient,
      });
    });
  container
    .animate(
      [
        { height: `${currentHeight}px` },
        { height: `${newContent.scrollHeight}px` },
      ],
      { duration: 200 * animationSpeedCoefficient }
    )
    .addEventListener("finish", () => {});
};

export const collapse = (container: HTMLElement): Animation => {
  const currentHeight = container.clientHeight;

  return container.animate(
    [{ height: `${currentHeight}px` }, { height: `0px` }],
    {
      duration: 200 * animationSpeedCoefficient,
    }
  );
};
export const expand = (container: HTMLElement): Animation => {
  const currentHeight = container.clientHeight;

  return container.animate(
    [{ height: `0px` }, { height: `${currentHeight}px` }],
    {
      duration: 200 * animationSpeedCoefficient,
    }
  );
};
