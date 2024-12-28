/**
 * Global website variables and helper functions
 */

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getCookie, setCookie } from "./cookie.js";
import {getAuth, onAuthStateChanged} from "firebase/auth";

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

export function redirect(path) {
  window.location.href = path;
}

export function checkAuth() {
  // Use onAuthStateChanged to detect the user's login state
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is logged in:", user);
    } else {
      window.location.href = "../index.html?status=invalid-user";
    }
  });
}

window.initializeFirebase = initializeFirebase;
window.redirect = redirect;
window.checkAuth = checkAuth;
