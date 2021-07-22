// import * as api from "./fakeItemsLoader";
import * as api from "./itemsLoader";
import { mapReponseItem } from "./mapper";

export const loadPlaylistItems = (
  playlist: YoutubePlaylist
): Promise<Item[]> => {
  return api
    .loadPlaylistItems(playlist.playlistId)
    .then((response) => response.items.map(mapReponseItem));
};

export const loadChannelItems = (channel: YoutubeChannel): Promise<Item[]> => {
  return api
    .loadChannelItems(channel.channelId)
    .then((response) => response.items.map(mapReponseItem));
};

export const findVideos = (term: string): Promise<Item[]> => {
  return api.loadSearchResults(term).then((response) => {
    console.log(response);
    return response.items.map(mapReponseItem);
  });
};
