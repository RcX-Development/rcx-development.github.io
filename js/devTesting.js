import {displayError, displayNotification, displayWarning} from "./app.js";

export let DevTesting = {
  init: function() {
    document.getElementById("notification-button").addEventListener("click", () => {
      const input = document.getElementById("notification-text");
      const length = document.getElementById("notification-length");
      displayNotification(input.value, length.value);
    });

    document.getElementById("warning-button").addEventListener("click", () => {
      const input = document.getElementById("warning-text");
      const length = document.getElementById("warning-length");
      displayWarning(input.value, length.value);
    });

    document.getElementById("error-button").addEventListener("click", () => {
      const input = document.getElementById("error-text");
      const length = document.getElementById("error-length");
      displayError(input.value, length.value);
    });
  }
}
