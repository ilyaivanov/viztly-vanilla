type MyItem = {
  id: string;
  title: string;
  isDone?: boolean;
};

type MyState = {
  items: MyItem[];
  itemsShown: boolean;
};

type MyCommnad1 = { type: "itemDoneChanged" };

type MyCommnad2 = { type: "itemsVisibilityChanged" };

type MyCommnad = MyCommnad1 | MyCommnad2;
type MyActionResult = [MyState, MyCommnad[]];

type CommandName = MyCommnad["type"];

type CB = (el: HTMLElement) => void;
type Subscription = { cb: CB; element: HTMLElement };
