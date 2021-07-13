import { ResponseItem } from "./itemsLoader";

export const mapReponseItem = (resItem: ResponseItem): Item => {
  if (resItem.itemType == "video")
    return {
      type: "YTvideo",
      id: resItem.id,
      title: resItem.name,
      videoId: resItem.itemId,
    };
  else if (resItem.itemType == "channel")
    return {
      type: "YTchannel",
      id: resItem.id,
      title: resItem.name,
      channelId: resItem.itemId,
      image: resItem.image,
      children: [],
    };
  else
    return {
      type: "YTplaylist",
      id: resItem.id,
      title: resItem.name,
      playlistId: resItem.itemId,
      image: resItem.image,
      children: [],
    };
};
