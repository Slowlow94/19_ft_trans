export function setupRegisterListeners(): void{
    const signInForm = document.getElementById("signInForm") as HTMLFormElement;
    const closeform = document.getElementById("closeForm") as HTMLButtonElement;
    
    signInForm.addEventListener("submit", (e) => {
        e.preventDefault();
    })
    closeform.addEventListener("click", () => {
        signInForm.classList.add("hidden");
    });
}

export function setupLoginListeners(): void{
    const loginForm = document.getElementById("logInForm") as HTMLFormElement;
    const loginModal = document.getElementById("loginModal") as HTMLDivElement;

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
    })
    loginModal.addEventListener("click", (e) => {
        if (e.target === loginModal) {
            loginModal.remove();
        }
    })
}