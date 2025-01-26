import {createCharacter, getCustomType} from "./database.js";
import {
  displayError,
  displayNotification,
  generateSwatch,
  listListener,
  listToArray,
  otherSelectionListener, rgbToHex
} from "./app.js";
import {changeTab} from "./homepage.js";

let override = false;

const fallbackRaces = [
  "Human",
  "Alien",
  "Undead",
  "Animal",
  "Other"
];

const lists = [
    "strength",
    "flaw",
    "natural-skill",
    "power",
    "equipment",
    "rare-equipment",
    "signature-move"
];

const skin_colors = [
  "#ffdbac", "#f1c27d", "#e0ac69", "#c68642", "#8d5524",
  "#7d4a22", "#6b3e1e", "#593319", "#482a15", "#3b2312",
  "#2d1a0e", "#1f110b", "#140905", "#0b0503", "#030202",
  "#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff",
  "#4b0082", "#9400d3"
];

const skin_color_names = [
  "Light Peach", "Peach", "Tan", "Light Brown", "Brown",
  "Medium Brown", "Dark Brown", "Very Dark Brown", "Deep Brown", "Chocolate",
  "Espresso", "Coal", "Charcoal", "Obsidian", "Black",
  "Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet"
];

export let CharacterCreate = {
  init: function() {
    otherSelectionListener("gender");
    otherSelectionListener("race");
    otherSelectionListener("religion");

    document.getElementById("override-checkbox").addEventListener("change", (event) => {
      override = event.target.checked;
    });

    // Add character data to database
    document.getElementById("cc-submit").addEventListener("click", async () => {
      let valid = true;
      for (let element of document.querySelectorAll(".warn")) {
        try {
          const input = element.getElementsByClassName("simple-input")[0];
          if (input != null && input.value === "" && !override) {
            element.classList.add("show-warn");
            valid = false;
          }
        } catch (_) { }
      }

      if (!valid && !override) {
        document.getElementById("form-status").children[0].innerHTML = "Cannot Submit with Empty Character Fields!"
        document.getElementById("form-status").style.display = "block";
        return;
      }

      let characterName = document.getElementById("name_input").value;
      let skin_color = document.getElementById("skin_color_btn").style.backgroundColor.replace(/[^\d,]/g, '').split(',')

      const data = {
        nickname: document.getElementById("nickname_input").value,
        gender: document.getElementById("gender_select").value === "Other" ? document.getElementById("other_gender").value : document.getElementById("gender_select").value,
        age: document.getElementById("age_input").value,
        weight: document.getElementById("weight_input").value,
        height_ft: document.getElementById("height_input_ft").value,
        height_in: document.getElementById("height_input_in").value,
        race: document.getElementById("race_select").value === "Other" ? document.getElementById("other_race").value : document.getElementById("race_select").value,
        skin_color: rgbToHex(skin_color[0], skin_color[1], skin_color[2]),
        religion: document.getElementById("religion_select").value === "Other" ? document.getElementById("other_religion").value : document.getElementById("religion_select").value,
        personality_traits: document.getElementById("personality-traits-input").value,
        world_view: document.getElementById("world-view-input").value,
        education: document.getElementById("education-input").value,
        body_language: document.getElementById("body-language-input").value,
        vocal_accent: document.getElementById("vocal-accent-input").value,
        relationships: document.getElementById("relationships-input").value,
        strengths: listToArray("strength"),
        flaws: listToArray("flaw"),
        natural_skills: listToArray("natural-skill"),
        powers: listToArray("power"),
        equipment: listToArray("equipment"),
        rare_equipment: listToArray("rare-equipment"),
        signature_moves: listToArray("signature-move"),
        quirk: document.getElementById("quirk-input").value,
        personal_goal: document.getElementById("personal-goal-input").value,
        basic_summary: document.getElementById("basic-summary-input").value,
        backstory: document.getElementById("backstory-input").value,
        major_developments: document.getElementById("major-developments-input").value,
        introduction: document.getElementById("introduction-input").value
      };

      let res = await createCharacter(characterName, data);

      if (res) {
        changeTab("overview");
        setTimeout(() => {
          displayNotification(`Created Character '${characterName}' Successfully!`);
        }, 750);
        return;
      }

      changeTab("overview");
      setTimeout(() => {
        displayError(`Failed to Create Character '${characterName}'!`);
      }, 750);
    });

    for (let list of lists) {
      listListener(list);
    }

    generateSwatch("skin_color", skin_colors, skin_color_names, true);
  },

  loadRaces: async function () {
    const raceSelect = document.getElementById("race_select");

    await getCustomType("races").then((races) => {
      for (let str of races) {
        const opt = document.createElement("option");
        opt.value = str.toString();
        opt.innerHTML = str.toString();
        raceSelect.appendChild(opt);
      }

      raceSelect.disabled = false;
    });
  },

  loadReligions: async function () {
    const religionSelect = document.getElementById("religion_select");

    await getCustomType("religions").then((races) => {
      for (let str of races) {
        const opt = document.createElement("option");
        opt.value = str.toString();
        opt.innerHTML = str.toString();
        religionSelect.appendChild(opt);
      }

      religionSelect.disabled = false;
    });
  }
}
