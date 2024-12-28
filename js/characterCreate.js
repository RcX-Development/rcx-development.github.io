import { getDocList } from "./database.js";

function initEventListeners() {
  document.getElementById("gender_select").addEventListener("change", () => {
    const genderSelect = document.getElementById("gender_select");
    const otherGender = document.getElementById("other_gender");

    if (genderSelect.value === "Other") {
      otherGender.style.display = "inline-block";
      return;
    }

    otherGender.style.display = "none";
  })

  document.getElementById("race_select").addEventListener("change", () => {
    const raceSelect = document.getElementById("race_select");
    const otherRace = document.getElementById("other_race");

    if (raceSelect.value === "Other") {
      otherRace.style.display = "inline-block";
      return;
    }

    otherRace.style.display = "none";
  })
}

const fallbackRaces = [
  "Human",
  "Alien",
  "Undead",
  "Animal",
  "Other"
]

async function loadRaces() {
  const raceSelect = document.getElementById("race_select");

  getDocList("types", "races").then((races) => {
    if (races.length === 0) {
      // Display error
      console.log("Failed to load races!");
      return;
    }

    for (let str of races) {
      const opt = document.createElement("option");
      opt.value = str.toString();
      opt.innerHTML = str.toString();
      raceSelect.appendChild(opt);
    }
  })
}

window.loadRaces = loadRaces;
