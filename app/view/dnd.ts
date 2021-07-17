import { dom, style } from "../browser";
import { spacings } from "../designSystem";
import { ItemIcon } from "./itemIcon";
import { store, glue } from "../infra";
import { ItemView } from "./itemsTree";
// import { AppEventTypes, ItemViewInterface } from "../model/appEventsTypes";

export class Dnd {
  itemBeingDragged?: Item;
  itemViewUnder?: Item;
  initialMousePosition: Vector = { x: 0, y: 0 };
  dragAvatar?: HTMLElement;
  dragDestination?: HTMLElement;
  dropPlacement?: DropPlacement;
  constructor(private appendItemTo: Element) {
    glue.dnd = this;
    // store.on("mouseDown", this.onItemMouseDown);
    // store.on("mouseOverItemDuringDrag", this.onItemMouseMoveOver);
  }
  onItemMouseDown = (itemModel: Item) => {
    document.body.style.userSelect = "none";
    document.body.style.cursor = "grabbing";

    this.itemBeingDragged = itemModel;
    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("mouseup", this.onMouseUp);
  };

  onMouseMove = (e: MouseEvent) => {
    const { itemBeingDragged, initialMousePosition, dragAvatar } = this;
    if (e.buttons == 1 && itemBeingDragged) {
      if (!dragAvatar) {
        const dist = distance(initialMousePosition, getScreenPosition(e));
        if (dist > 5) {
          const icon = new ItemIcon(store.getItem(itemBeingDragged.id));
          this.dragAvatar = dom.div({
            className: "item-dragAvatar",
            children: [icon.el],
          });
          this.appendItemTo.appendChild(this.dragAvatar);
          this.updateDragAvatarPosition(this.dragAvatar, e);
        }
      } else {
        this.updateDragAvatarPosition(dragAvatar, e);
      }
    } else {
      this.finishDrag();
    }
  };

  onItemMouseMoveOver = (itemViewUnder: Item, e: MouseEvent) => {
    // const { itemUnder, e } = payload;
    if (this.dragAvatar) {
      this.itemViewUnder = itemViewUnder;
      if (!this.dragDestination) {
        const bulp = dom.div({ className: "item-dragDestinationBulp" });
        const type = store.getItem(itemViewUnder.id).type;
        bulp.style.borderRadius =
          (type === "folder" || type === "YTchannel" ? 5 : 1) + "px";
        this.dragDestination = dom.div({
          className: "item-dragDestinationLine",
          children: [bulp],
        });
        this.appendItemTo.appendChild(this.dragDestination);
      }
      this.updateDragDestinationPosition(
        this.dragDestination,
        e.currentTarget as HTMLElement,
        e
      );
    }
  };

  onMouseUp = () => {
    this.drop();
    this.finishDrag();
  };

  drop = () => {
    const { itemBeingDragged, itemViewUnder, dropPlacement } = this;
    if (itemBeingDragged && itemViewUnder && dropPlacement) {
      store.dropItem({
        itemOver: itemBeingDragged.id,
        placement: dropPlacement,
        itemUnder: itemViewUnder.id,
      });
    }
  };

  updateDragDestinationPosition = (
    dragDestination: HTMLElement,
    rowUnder: HTMLElement,
    e: MouseEvent
  ) => {
    const outerCircle = rowUnder.getElementsByClassName("item-icon-svg")[0]!;
    const circleRect = outerCircle.getBoundingClientRect();
    const left = circleRect.left + spacings.outerRadius - BULP_RADIUS;

    const rect = rowUnder.getBoundingClientRect();

    const mousePosition = getScreenPosition(e);
    const isOnTheLowerHalf = mousePosition.y > rect.top + rect.height / 2;

    let isInside = 0;

    if (isOnTheLowerHalf) {
      this.dropPlacement = "after";
      dragDestination.style.top = rect.bottom - 1 + "px";
    } else {
      dragDestination.style.top = rect.top - 1 + "px";
      this.dropPlacement = "before";
    }

    if (
      mousePosition.x > circleRect.left + spacings.outerRadius * 2 &&
      isOnTheLowerHalf
    ) {
      this.dropPlacement = "inside";
      isInside = 1;
    }
    dragDestination.style.left =
      left + isInside * spacings.spacePerLevel + "px";
  };

  updateDragAvatarPosition = (avatar: HTMLElement, e: MouseEvent) => {
    avatar.style.top = e.pageY - spacings.outerRadius + "px";
    avatar.style.left = e.pageX - spacings.outerRadius * 2 + "px";
  };

  finishDrag = () => {
    if (this.dragAvatar) {
      this.dragAvatar.remove();
      this.dragAvatar = undefined;
    }
    if (this.dragDestination) {
      this.dragDestination.remove();
      this.dragDestination = undefined;
    }
    document.body.style.removeProperty("user-select");
    document.body.style.removeProperty("cursor");
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("mouseup", this.onMouseUp);
    store.mouseUp();
  };
}
interface Vector {
  x: number;
  y: number;
}

//accessing clientX is ugly, but I have no other way to pass pageX from tests
//https://github.com/testing-library/dom-testing-library/issues/144
//https://github.com/jsdom/jsdom/issues/1911
const getScreenPosition = (e: MouseEvent): Vector => ({
  x: e.pageX || e.clientX,
  y: e.pageY || e.clientY,
});

const distance = (a1: Vector, a2: Vector) => {
  const xDiff = a1.x - a2.x;
  const yDiff = a1.y - a2.y;
  return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
};
style.class("item-dragAvatar", {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 200,
});

style.class("item-dragDestinationLine", {
  position: "fixed",
  pointerEvents: "none",
  height: 2,
  backgroundColor: "white",
  //   backgroundColor: colorVars.dragDestination,
  width: 150,
  zIndex: 100,
});

const BULP_RADIUS = 4;
style.class("item-dragDestinationBulp", {
  position: "absolute",
  height: BULP_RADIUS * 2,
  width: BULP_RADIUS * 2,
  left: 0,
  top: -3,
  backgroundColor: "white",
});

export default Dnd;
