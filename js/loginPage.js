import { auth, initializeFirebase } from "./app.js";
import { signInWithEmailAndPassword, onAuthStateChanged  } from "firebase/auth";

export function checkState() {
  const state = new URLSearchParams(window.location.search).get("state");

  if (!state) { return; }

  switch (state) {
    case "invalid-user":
      loginError("Failed to login, missing password!");
      break;
    default:
      loginError("Mmm egg 🥚");
      break;
  }
}

document.getElementById("login-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!auth) { await initializeFirebase(); }

  const email = document.getElementById("email_input").value;
  const password = document.getElementById("password_input").value;

  try {
    const userCred = await signInWithEmailAndPassword(auth, email.toString(), password.toString());
    onAuthStateChanged(auth, (user) => {
      if (user) { window.location.href = "pages/homepage.html"; }
      throw new Error("");
    });
  } catch (error) {
    console.log("Login failed!\n" + error);

    const match = error.toString().match(/auth\/([a-z-]+)/);
    switch (match[1]) {
      case "invalid-email":
        loginError("Failed to login, invalid email!");
        break;
      case "invalid-credential":
        loginError("Failed to login, invalid credentials!");
        break;
      case "missing-password":
        loginError("Failed to login, missing password!");
        break;
      default:
        loginError("Failed to login!");
        break;
    }
  }
});

function loginError(errStr) {
  document.getElementById("login-status").children[0].innerHTML = errStr;
  document.getElementById("login-status").style.display = "block";
}

window.checkState = checkState;
