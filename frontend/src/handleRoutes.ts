import { setupRegisterListeners, setupLoginListeners } from "./handleForm.js";

type Route = "/login" | "/register";
// "/" | "/home";

const routes: Record<Route, string> = {
//   "/": "views/index.html",
//   "/home": "views/home.html",
  "/login": "views/logInForm.html",
  "/register": "views/signInForm.html",
};

async function loadView(path: Route) {
  const container = document.getElementById("FormContainer")!;
  console.log("TEST1");
  try {
    const response = await fetch(routes[path]);
    const html = await response.text();
    container.innerHTML = html;

    if (path === "/login") setupLoginListeners();
    if (path === "/register") setupRegisterListeners();
    // home et game
  } catch (err) {
    container.innerHTML = "<p>View not found</p>";
  }
}

function navigateTo(path: Route) {
  history.pushState({}, "", path);
  loadView(path);
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
    console.log("TEST");
  const path = window.location.pathname as Route;
  console.log(path);
  loadView(path);
});

// 🔥 Initialisation
document.addEventListener("DOMContentLoaded", () => {
  setupNavLinks();
  loadView(window.location.pathname as Route);
});
