import { getDocumentIds } from "./database.js";

function loadCharacters() {
  const listObj = document.getElementById("character-list");

  getDocumentIds("characters").then((elements) => {
    if (!elements || elements.length === 0) {
      // Display error
      console.log("Failed to load races!");
      return;
    }

    for (let element of elements) {
      const entryObj = document.createElement("li");

      entryObj.appendChild(document.createTextNode(element));
      entryObj.classList.add("air-btn");

      listObj.appendChild(entryObj);
    }

  });
}

window.loadCharacters = loadCharacters;
