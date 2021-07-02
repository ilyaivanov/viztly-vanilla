import { items } from "../domain";
export const loadPlaylistItems = (): Promise<Item[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(items.getRandomItems());
    }, 2000);
  });
};
