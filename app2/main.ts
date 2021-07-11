import { store } from "./globals";
import { renderApp } from "./view/app";

document.body.appendChild(renderApp());
store.init();
