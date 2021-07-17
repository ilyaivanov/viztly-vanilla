import { sampleUserName } from "./app/api/config";
import {
  loadUserSettings,
  PersistedState,
  initFirebase,
} from "./app/api/userState";
import { store } from "./app/infra";
import { renderApp } from "./app/view/app";

const dataKey = "DATA:v1";

export const loadRemoteState = () => {
  const localData = localStorage.getItem(dataKey);

  const onDataReady = (data: PersistedState) => {
    const loadedItems: Items = JSON.parse(data.itemsSerialized);
    store.state.items = loadedItems;
    const id = (loadedItems["HOME"] as ItemContainer).children[0];
    store.state.mainSelectedItem = id;
    store.state.items["SEARCH"] = {
      id: "SEARCH",
      type: "search",
      children: [],
      searchTerm: "",
      title: "Search",
    };
    document.body.appendChild(renderApp());
    store.init();
    // items.itemsLoaded(loadedItems);
    // focusItem(loadedItems[data.selectedItemId]);
  };

  if (localData) {
    console.log(`Loaded from localStorage ${dataKey}`);
    const parsed = JSON.parse(localData) as PersistedState;
    Promise.resolve().then(() => onDataReady(parsed));
  } else {
    loadUserSettings(sampleUserName).then(onDataReady);
  }
};

initFirebase(() => 42);
loadRemoteState();
