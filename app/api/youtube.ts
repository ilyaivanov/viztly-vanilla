import { getRandomItems } from "../domain/items";
export const loadPlaylistItems = (): Promise<Item[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getRandomItems());
    }, 2000);
  });
};

export const findVideos = (term: string): Promise<Item[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        getRandomItems().map((i) => ({ ...i, title: i.title + ` (${term})` }))
      );
    }, 2000);
  });
};
