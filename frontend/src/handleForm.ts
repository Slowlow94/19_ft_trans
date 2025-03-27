import { loadView } from "./handleRoutes.js"
import {renderUserWidget} from "./userWidget.js"
import { BASE_PATH } from "./handleRoutes.js";
import { updateUIBasedOnAuth } from "./auth.js";

export function setupRegisterListeners(): void{
    const signInForm = document.getElementById("signInForm") as HTMLFormElement;
    const closeform = document.getElementById("closeForm") as HTMLButtonElement;
    
    signInForm.addEventListener("submit", (e) => {
        e.preventDefault();
    })
    closeform.addEventListener("click", () => {
        signInForm.classList.add("hidden");
        history.replaceState({}, "", "/");
    });
}

export function removeErrorStyleLogIn(input: HTMLInputElement, style: string): void{
    input.classList.remove(style);
}

export function setupLoginListeners(): void{
    const loginForm = document.getElementById("logInForm") as HTMLFormElement;
    const loginModal = document.getElementById("loginModal") as HTMLDivElement;

    const emailInput = document.getElementById("lastname") as HTMLInputElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;
    
    emailInput.addEventListener("click", () => removeErrorStyleLogIn(emailInput, "border-red-500"));
    passwordInput.addEventListener("click", () => removeErrorStyleLogIn(passwordInput, "border-red-500"));

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        //simulation id
        const fakeUser = {
            email: "test@test.be",
            password: "#123Quatre",
        };

        if (email === fakeUser.email && password === fakeUser.password) {
            sessionStorage.setItem("isLoggedIn", "true");
            updateUIBasedOnAuth();
            alert("Connected!");
            history.replaceState({}, "", "/");
            loadView("/");
            renderUserWidget({name: "Salowie", avatar: `${BASE_PATH}/img/avatar.jpg`});
        } else {
            if (email !== fakeUser.email)
                emailInput.classList.add("border-red-500");
            if (password !== fakeUser.password)
                passwordInput.classList.add("border-red-500");
        }
    })
    loginModal.addEventListener("click", (e) => {
        if (e.target === loginModal) {
            loginModal.remove();
            history.replaceState({}, "", "/");
        }
    })
}