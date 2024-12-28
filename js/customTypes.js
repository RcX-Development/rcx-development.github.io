import { getDocListKeyed, removeField } from "./database.js";

// List of [HTML name, DB name] for all editable lists
const lists = [
  ["race", "races"]
];

document.getElementById("save_button").addEventListener("click", (event) => {
  event.preventDefault();
});

function loadLists() {
  for (let list of lists) {
    const listObj = document.getElementById(`${list[0]}-list`);

    getDocListKeyed("types", list[1]).then((elements) => {
      if (!elements || elements.length === 0) {
        // Display error
        console.log("Failed to load races!");
        return;
      }

      for (let element of elements) {
        const entryObj = document.createElement("li");
        const deleteBtn = document.createElement("button");
        const editBtn = document.createElement("button");
        const buttonWrapper = document.createElement("div");

        entryObj.appendChild(document.createTextNode(element[1]));
        deleteBtn.innerHTML = "<span class='material-symbols-outlined interactable' style='font-size: 1.5em; color: #555555;'>delete</span>";
        editBtn.innerHTML = "<span class='material-symbols-outlined interactable' style='font-size: 1.5em; color: #555555;'>edit</span>";

        deleteBtn.classList.add("clean-icon");
        editBtn.classList.add("clean-icon");

        deleteBtn.addEventListener("click", (event) => {
          event.preventDefault();

          if (confirm("Delete type entry?")) {
            removeField("types", list[1], element[0]).then(() => {
              listObj.removeChild(entryObj);
            }).catch((error) => {
              console.error("Error deleting item:", error);
            });
          }
        });

        editBtn.addEventListener("click", (event) => {
          event.preventDefault();
          // Modify local version
        });

        buttonWrapper.classList.add("button-wrapper");
        buttonWrapper.appendChild(deleteBtn);
        buttonWrapper.appendChild(editBtn);

        entryObj.appendChild(buttonWrapper);
        listObj.appendChild(entryObj);
      }

    });
  }
}

window.loadLists = loadLists;
