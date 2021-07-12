import { store } from "./app/infra";
import { renderApp } from "./app/view/app";

document.body.appendChild(renderApp());
store.init();
