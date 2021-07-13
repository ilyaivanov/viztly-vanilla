import {
  loadSearchResults,
  loadPlaylistItems as loadYoutubePlaylistItems,
} from "./fakeItemsLoader";
import { mapReponseItem } from "./mapper";

export const loadPlaylistItems = (): Promise<Item[]> => {
  return loadYoutubePlaylistItems("some").then((response) =>
    response.items.map(mapReponseItem)
  );
};

export const findVideos = (term: string): Promise<Item[]> => {
  return loadSearchResults(term).then((response) =>
    response.items.map(mapReponseItem)
  );
};
