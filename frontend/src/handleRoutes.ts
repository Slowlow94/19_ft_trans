import { setupRegisterListeners, setupLoginListeners } from "./handleForm.js";
import { updateUIBasedOnAuth, isLoggedIn } from "./auth.js";
import {setupSettingsForm} from "./userWidget.js";

export const BASE_PATH = window.location.origin + window.location.pathname.split("/").slice(0, -1).join("/");
const currentPath = window.location.pathname as Route;
type Route = "/login" | "/register" | "/" | "/game" | "/settings";

const routes: Record<Route, string> = {
  "/": `${BASE_PATH}/views/home.html`,
  "/register": `${BASE_PATH}/views/signInForm.html`,
  "/login": `${BASE_PATH}/views/logInForm.html`,
  "/game": `${BASE_PATH}/views/game.html`,
  "/settings": `${BASE_PATH}/views/settingsUserWidget.html`,
};

export async function loadView(path: Route) {
  const container = document.getElementById("FormContainer");
  const pongCanva = document.getElementById("pongGame");

  if (container) container.innerHTML = "";
  if (pongCanva) pongCanva.classList.add("hidden");

  try {
    const response = await fetch(routes[path]);
    const html = await response.text();

    if (path === "/login" || path === "/register") {
      container!.innerHTML = html;
      if (path === "/login") setupLoginListeners();
      if (path === "/register") setupRegisterListeners();
      // updateUIBasedOnAuth();
    }
    if (path === "/settings") {
      // container!.innerHTML = html; find a way to separe ts and html/css
      if (!isLoggedIn()) {
        alert("You need to be logged to acces to settings");
        history.replaceState({}, "", "/");
        loadView("/");
        return;
      }
      setupSettingsForm();
    }
    if (path === "/game") {
      container!.innerHTML = html;
      if (!isLoggedIn()) {
        alert("You need to be logged to play");
        history.replaceState({}, "", "/");
        loadView("/");
        return;
      }
      pongCanva!.classList.remove("hidden");
      // setupGame();
    }
    if (path === "/") {
      container!.innerHTML = html;
      // updateUIBasedOnAuth();
      //setupHome();
    }
  } catch (err) {
    container!.innerHTML = "<p>View not found</p>";
  }
}

function navigateTo(path: Route) {
  history.pushState({}, "", path);
  loadView(path);
  updateUIBasedOnAuth();
}

function setupNavLinks() {
  const buttons = document.querySelectorAll("[data-route]");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const route = (btn as HTMLButtonElement).dataset.route as Route;
      navigateTo(route);
    });
  });
}

// 🔄 Gérer le bouton "back" du navigateur
window.addEventListener("popstate", () => {
  const path = window.location.pathname as Route;
  loadView(path);
  // updateUIBasedOnAuth();
});

// 🔥 Initialisation
document.addEventListener("DOMContentLoaded", () => {
  setupNavLinks();
  if(routes[currentPath])
    loadView(currentPath);
  else {
    history.replaceState({}, "", "/");
    loadView("/");
  }
});
