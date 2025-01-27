import {getDocumentIds} from "./database.js";
import {displayError} from "./app.js";

export function loadCharacters() {
  const listObj = document.getElementById("character-list");
  const totalObj = document.getElementById("character-total");
  let total = 0;

  getDocumentIds("characters").then((elements) => {
    if (!elements || elements.length === 0) {
      displayError("Failed to load characters!");
      return;
    }

    listObj.innerHTML = "";
    for (let element of elements) {
      const entryObj = document.createElement("li");
      entryObj.appendChild(document.createTextNode(element));
      entryObj.style.fontWeight = "bold";
      listObj.appendChild(entryObj);
      total += 1;
    }

    totalObj.innerHTML = `Total : ${total}`;
  });
}
