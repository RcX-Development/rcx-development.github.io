/**
 * Global website variables and helper functions
 */

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDN-gGuYylERtSLCnSpa9IELjBsUA55Xts",
  authDomain: "rcx-media-main.firebaseapp.com",
  projectId: "rcx-media-main",
  storageBucket: "rcx-media-main.firebasestorage.app",
  messagingSenderId: "1004186310906",
  appId: "1:1004186310906:web:95b9813e5532e77d521143"
};

export let app, db, auth;
let firebaseInitialized = false;

export async function initializeFirebase() {
  if (!firebaseInitialized) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    firebaseInitialized = true;
  }
}

export function checkAuth(servePath) {
  onAuthStateChanged(auth, (user) => {
    if (user && firebaseInitialized) {
      if (servePath) { window.location.href = servePath; }
      return;
    }

    window.location.href = "../index.html?status=invalid-user";
  });
}

const AlertLevel = Object.freeze({
  Notification: "#000000",
  Warning: "#FFEA00",
  Error: "#C92E2E"
});

export function displayNotification(message, timeOut = 3000) {
  displayAlert(message, AlertLevel.Notification, timeOut);
}

export function displayWarning(message, timeOut = 3000) {
  displayAlert(message, AlertLevel.Warning, timeOut);
}

export function displayError(message, timeOut = 3000) {
  displayAlert(message, AlertLevel.Error, timeOut);
}

export function displayAlert(message, level, timeOut = 3000) {
  const alertBox = document.getElementById("alertBox");

  alertBox.children[0].innerHTML = message;
  alertBox.style.display = "block";
  alertBox.children[0].style.color = level;

  if (level !== AlertLevel.Notification) {
    alertBox.style.textShadow = "-1px 1px black";
  } else {
    alertBox.style.textShadow = "";
  }

  if (timeOut !== 0) {
    setTimeout(() => {
      alertBox.style.display = "none";
    }, timeOut);
  }
}

export function otherSelectionListener(type) {
  document.getElementById(`${type}_select`).addEventListener("change", () => {
    const select = document.getElementById(`${type}_select`);
    const other = document.getElementById(`other_${type}`);

    if (select.value === "Other") {
      other.style.display = "inline-block";
      return;
    }

    other.style.display = "none";
  })
}

export function listListener(type) {
  document.getElementById(`add-${type}`).addEventListener("click", () => {
    const list = document.getElementById(`${type}-list`);
    const addText = document.getElementById(`${type}-text`);
    if (addText.value !== "" && !locked(type)) {
      addToList(addText.value, list, type);
      addText.value = "";
    }
  });

  document.getElementById(`${type}-lock`).addEventListener("click", () => {
    const icon = document.getElementById(`${type}-lock-icon`);
    icon.innerHTML = icon.innerHTML === "lock" ? "lock_open" : "lock";
  });
}

export function locked(type) {
  return document.getElementById(`${type}-lock-icon`).innerHTML === "lock";
}

export function rgbToHex(r, g, b) {
  return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

export function addToList(text, list, type) {
  const listElement = document.createElement("li");
  const listContainer = document.createElement("div");
  const textDisplay = document.createElement("button");
  const removeButton = document.createElement("button");

  listContainer.classList.add("list-container");
  textDisplay.classList.add("list-entry");
  textDisplay.innerHTML = text;
  removeButton.classList.add("square");
  removeButton.style.margin = "5px";
  removeButton.style.fontSize = "1.5em";
  removeButton.innerHTML = "-";
  removeButton.onclick = () => {
    if (!locked(type)) {
      listElement.remove();
    }
  };

  listContainer.appendChild(textDisplay);
  listContainer.appendChild(removeButton);
  listElement.appendChild(listContainer);
  list.appendChild(listElement);
}

export function listToArray(type) {
  const list = document.getElementById(`${type}-list`);
  const array = []

  for (let entry of list.children) {
    array.push(entry.children[0].children[0].innerHTML);
  }

  return array;
}

// This is going to be a set-size 5 x 5 grid for now
// TODO : Update to correctly place 'other' input box and checkbox on new row accordingly
export function generateSwatch(name, colors, names, other = true) {
  const button = document.getElementById(`${name}_btn`);
  const swatch = document.getElementById(`${name}_swatch`);

  button.style.backgroundColor = colors[0];

  swatch.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.addEventListener('click', () => {
    swatch.style.display = 'none';
  });

  button.addEventListener("click", (event) => {
    swatch.style.display = swatch.style.display === 'none' ? 'block' : 'none';
    event.stopPropagation();
  });

  for (let i = 0; i < colors.length; i++) {
    const itemOuter = document.createElement("div");
    const btn = document.createElement("button");

    btn.classList.add("swatch");
    btn.title = (names[i] === null) ? "" : names[i];
    btn.style.backgroundColor = colors[i];
    btn.style.margin = "5px 0 0 5px";

    btn.addEventListener("click", () => {
      button.style.backgroundColor = btn.style.backgroundColor;
    });

    swatch.appendChild(btn);
  }

  if (other && colors.length < 25) {
    const otherColor = document.createElement("input")

    otherColor.type = "text";
    otherColor.style.margin = "5px 0 0 5px";
    otherColor.style.width = ((25 - colors.length) * 20 + (25 - colors.length - 1) * 5 - 15).toString() + "px";

    otherColor.addEventListener("input", () => {
      if (otherColor.value === "") { return; }
      button.style.backgroundColor = otherColor.value;
    });

    swatch.appendChild(otherColor);
  }
}

window.initializeFirebase = initializeFirebase;
window.checkAuth = checkAuth;
