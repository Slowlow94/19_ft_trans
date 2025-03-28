import {logout} from "./auth.js"
import { loadView } from "./handleRoutes.js";

export async function renderUserWidget(user: {name: string, avatar: string}) {
    const widgetContainer = document.getElementById("userWidgetContainer");
    if (!widgetContainer) return;

    widgetContainer.innerHTML = `
    <div id="userWidget" class="relative group cursor-pointer">
  <button type="button" class="inline-flex items-center gap-x-1 text-sm/5 font-semibold text-gray-900" aria-expanded="false">
  <img src="${user.avatar}" alt="avatar" class="w-6 h-6 rounded-full object-cover"/>
    <span>${user.name}</span>
    <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
      <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
    </svg>
  </button>

  <!--
    Flyout menu, show/hide based on flyout menu state.

    Entering: "transition ease-out duration-200"
      From: "opacity-0 translate-y-1"
      To: "opacity-100 translate-y-0"
    Leaving: "transition ease-in duration-150"
      From: "opacity-100 translate-y-0"
      To: "opacity-0 translate-y-1"
  -->
  <div class="absolute right-0 z-10 mt-4 flex w-screen max-w-max px-3 opacity-0 translate-y-1">
    <div class="w-auto flex-auto overflow-hidden rounded-3xl bg-white opacity-90 text-sm/4 ring-1 shadow-lg ring-gray-900/5">
      <div class="p-3">
        <div class="group relative flex items-center gap-x-1 rounded-lg p-2 hover:bg-gray-50">
          <div class="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
             <svg class="size-6 text-gray-600 group-hover:text-rose-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
            </svg>
          </div>
          <div>
            <button
            type="button"
            data-rpute="/settings"
            id="settingsBtn"
            class="font-semibold text-gray-900"
            >
          Settings
          </button>
          </div>
        </div>
        <div class="group relative flex items-center gap-x-1 rounded-lg p-2 hover:bg-gray-50">
          <div class="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <svg class="size-6 text-gray-600 group-hover:text-rose-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
            </svg>
          </div>
          <div>
          <button
            type="button"
            id="scoresBtn"
            class="font-semibold text-gray-900"
            >
          Scores
          </button>
          </div>
        </div>
        <div class="group relative flex items-center gap-x-1 rounded-lg p-2 hover:bg-gray-50">
          <div class="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <svg class="size-6 text-gray-600 group-hover:text-rose-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>
          </div>
          <div>
            <button
            type="button"
            id="logoutBtn"
            class="font-semibold text-gray-900"
            >
            Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`
    const dropDownBtn = document.querySelector("#userWidget button");
    const dropDownMenu = document.querySelector("#userWidget > div.absolute");
    if (dropDownBtn && dropDownMenu) {
      let isOpen = false;
        const openMenu = () => {
            dropDownMenu.classList.remove("opacity-0", "translate-y-1");
            dropDownMenu.classList.add("opacity-100", "translate-y-0", "block");
            dropDownMenu.classList.add("transition", "ease-out", "duration-200");
		        isOpen = true;
        }
        const closeMenu = () => {
            dropDownMenu.classList.remove("opacity-100", "translate-y-0", "block");
            dropDownMenu.classList.add("opacity-0", "translate-y-1");
            isOpen = false;
        }
        dropDownBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (isOpen)
                closeMenu();
            else
                openMenu();
        });

        document.addEventListener("click", (e) => {
            if (isOpen && !dropDownMenu.contains(e.target as Node))
                closeMenu();
        })
    }

    document.getElementById("logoutBtn")?.addEventListener("click", () => {
        logout();
    });

    document.getElementById("settingsBtn")?.addEventListener("click", () => {
      // closeMenu(); create function outside the function
      history.pushState({}, "", "/settings");
      loadView("/settings");
    })

    document.getElementById("scoresBtn")?.addEventListener("click", () => {
        alert("redirection to scores");
    })
}

export async function setupSettingsForm() {
  const settingsUserWidget = document.getElementById("settingsContainer");
  if (!settingsUserWidget) return;

  settingsUserWidget.innerHTML = `
  <section class="mt-10 max-w-md mx-auto bg-white bg-opacity-90 rounded-2xl shadow-lg p-6 text-sm text-gray-800">
    <h2 class="text-xl font-bold mb-4 text-center text-gray-900">Account settings</h2>
  
    <form id="settingsForm" class="space-y-4">
      <div>
        <label for="username" class="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
        <input type="text" id="username" name="username" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm" placeholder="Salowie" />
      </div>
  
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Adresse e-mail</label>
        <input type="email" id="email" name="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm" placeholder="email@exemple.com" />
      </div>
  
      <div>
        <label for="avatar" class="block text-sm font-medium text-gray-700">Photo de profil (URL)</label>
        <input type="text" id="avatar" name="avatar" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm" placeholder="https://..." />
      </div>
  
      <div class="pt-4">
        <button type="submit" class="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-xl hover:bg-indigo-700 transition">
          Sauvegarder
        </button>
      </div>
    </form>
  </section>
`
}