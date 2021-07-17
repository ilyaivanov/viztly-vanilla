import { loadPlaylistItems as loadYoutubePlaylistItems } from "./fakeItemsLoader";
import * as api from "./itemsLoader";
import { mapReponseItem } from "./mapper";

export const loadPlaylistItems = (): Promise<Item[]> => {
  return loadYoutubePlaylistItems("some").then((response) =>
    response.items.map(mapReponseItem)
  );
};

export const findVideos = (term: string): Promise<Item[]> => {
  return api.loadSearchResults(term).then((response) => {
    console.log(response);
    return response.items.map(mapReponseItem);
  });
};
