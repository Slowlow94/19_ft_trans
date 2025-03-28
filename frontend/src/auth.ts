export function isLoggedIn(): boolean {
    return sessionStorage.getItem("isLoggedIn") === "true";
}

export function logout(): void {
    sessionStorage.removeItem("isLoggedIn");
    history.replaceState({}, "", "/");
    window.location.reload();
}

export function updateUIBasedOnAuth(): void {
    const registerBtn = document.getElementById("signInBtn");
    const loginBtn = document.getElementById("logInBtn");
    const gameBtn = document.getElementById("gameBtn");

    if (isLoggedIn()) {
      if (registerBtn) registerBtn.classList.add("hidden");
      if (loginBtn) loginBtn.classList.add("hidden");
      if (gameBtn) gameBtn.classList.remove("hidden");
    } else {
      if (registerBtn) registerBtn.classList.remove("hidden");
      if (loginBtn) loginBtn.classList.remove("hidden");
      if (gameBtn) gameBtn.classList.add("hidden");
    }
  }