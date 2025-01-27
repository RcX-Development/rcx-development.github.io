import { getDocumentIds } from "./database.js";
import { CharacterCreate, loadRaces, loadReligions} from "./characterCreate.js";
import {DevTesting} from "./devTesting.js";
import {displayError} from "./app.js";
import {loadCharacters} from "./overview.js";

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll('[role="tab"]');
  const content = document.querySelector("#content-pane");

  const tabContent = {
    "overview": "../pages/overview.html",
    "new-character": "../pages/characterCreate.html",
    "custom-types": "../pages/customTypes.html",
    "dev-testing": "../pages/devTesting.html"
  };

  const tabOnLoads = {
    "overview": () => { loadCharacters(); },
    "new-character": () => {
      CharacterCreate.init();
      CharacterCreate.loadRaces();
      CharacterCreate.loadReligions()
    },
    "dev-testing": () => { DevTesting.init() }
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", (event) => {
      event.preventDefault();

      tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
      tab.setAttribute('aria-selected', 'true');

      const tabKey = tab.getAttribute('data-tab');
      const filePath = tabContent[tabKey];

      if (filePath) {
        fetch(filePath)
          .then(response => {
            if (!response.ok) { throw new Error(`Failed to load ${filePath}: ${response.statusText}`); }
            return response.text();
          })
          .then(htmlContent => { // Serve content & wait for it to load fully
            content.innerHTML = htmlContent;
            return new Promise(resolve => {
              requestAnimationFrame(() => resolve());
            });
          }).then(() => { // Run onLoad lambda
            try { tabOnLoads[tabKey](); } catch (_) { /* No errors here! 😁 */ }
          }).catch(error => {
            console.error(error);
            content.innerHTML = "<p style='color: #c92e2e; font-weight: bold'>Failed to load content.</p>";
          });
      } else {
        content.innerHTML = "<p style='color: #c92e2e; font-weight: bold'>Content not found.</p>";
      }
    });
  });

  // Load overview page
  const defaultTab = document.querySelector('[data-tab="overview"]');
  if (defaultTab) { defaultTab.querySelector('a').click(); }
});

export function changeTab(tabName) {
  const tabs = document.querySelectorAll('[role="tab"]');

  tabs.forEach((tab) => {
    if (tab.getAttribute('aria-disabled') === 'true') return;

    const tabKey = tab.getAttribute('data-tab');
    tab.setAttribute('aria-selected', 'false');

    if (tabKey === tabName) { tab.setAttribute('aria-selected', 'true'); tab.click(); }
  })
}
