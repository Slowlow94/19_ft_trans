import {logout} from "./auth.js"
import { BASE_PATH } from "./handleRoutes.js";

export async function renderUserWidget(user: {name: string, avatar: string}) {
    const widgetContainer = document.getElementById("userWidgetContainer");
    if (!widgetContainer) return;

    widgetContainer.innerHTML = `
<div id="userWidget" class="relative group cursor-pointer">
  <div class="flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow">
    <img
      src="${user.avatar}"
      alt="Avatar"
      class="w-8 h-8 rounded-full object-cover"
    />
    <span class="text-blue-800 font-semibold">${user.name}</span>
  </div>
  <div
    class="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg hidden group-hover:block z-50"
  >
    <button
      class="block w-full px-4 py-2 text-left hover:bg-gray-100"
      id="viewScores"
    >
      Mes scores
    </button>
    <button
      class="block w-full px-4 py-2 text-left hover:bg-gray-100"
      id="viewSettings"
    >
      Paramètres
    </button>
    <button
      class="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-100"
      id="logoutBtn"
    >
      Se déconnecter
    </button>
  </div>
</div>
`
    document.getElementById("logoutBtn")?.addEventListener("click", logout);
    // document.getElementById("logOutBtn")?.addEventListener("click", () => {
    //     logout();
    // });

    document.getElementById("viewSettings")?.addEventListener("click", () => {
        alert("redirection to parameters");
    })
    document.getElementById("viewScores")?.addEventListener("click", () => {
        alert("redirection to scores");
    })
}