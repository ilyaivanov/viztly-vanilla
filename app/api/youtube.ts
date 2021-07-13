import { loadSearchResults, loadPlaylistItems as fo } from "./fakeItemsLoader";
import { mapReponseItem } from "./mapper";

export const loadPlaylistItems = (): Promise<Item[]> => {
  return fo("some").then((response) => response.items.map(mapReponseItem));
};

export const findVideos = (term: string): Promise<Item[]> => {
  return loadSearchResults(term).then((response) =>
    response.items.map(mapReponseItem)
  );
};
