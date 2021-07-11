import { store } from "./globals";
import { viewTree } from "./view";

document.body.appendChild(viewTree());
store.init();
