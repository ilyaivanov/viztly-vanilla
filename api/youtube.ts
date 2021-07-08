import { items } from "../domain";
export const loadPlaylistItems = (): Promise<Item[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(items.getRandomItems());
    }, 2000);
  });
};

export const findVideos = (term: string): Promise<Item[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        items
          .getRandomItems()
          .map((i) => ({ ...i, title: i.title + ` (${term})` }))
      );
    }, 2000);
  });
};
