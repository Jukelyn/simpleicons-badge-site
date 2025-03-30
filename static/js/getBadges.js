"use strict";
const selectedBadges = []; // Array to store selected badges
const tbodyEl = document.querySelector("#selectedBadgesTable tbody");
const selectedBadgesTextarea = document.querySelector("#selectedBadges");
// Function to handle checkbox click and update the selected badges
function toggleCheckbox(row) {
    const checkbox = row.querySelector('input[type="checkbox"]');
    const badgeName = row.getAttribute("data-badge-name");
    const badgeURL = row.getAttribute("data-badge-url");
    // Get the index of the row
    const rowIndex = Array.from(row.parentNode.children).indexOf(row);
    if (checkbox.checked) {
        // Add the badge to the array (preserve row index for order)
        selectedBadges.push({ badgeName, badgeURL, rowIndex });
    }
    else {
        // Remove the badge from the array if unchecked
        const index = selectedBadges.findIndex((item) => item.badgeURL === badgeURL);
        if (index !== -1) {
            selectedBadges.splice(index, 1);
        }
    }
    // Sort the selectedBadges array by the row index to maintain the order
    selectedBadges.sort((a, b) => a.rowIndex - b.rowIndex);
    // Update content
    updateContent();
}
// Update textarea and selected badges table with selected badges
function updateContent() {
    // Update the textarea with selected badge URLs in order of selection
    selectedBadgesTextarea.value = selectedBadges
        .map((item) => `![${item.badgeName}](${item.badgeURL})`)
        .join("\n");
    // Update the selected badges table
    tbodyEl.innerHTML = ""; // Clear existing rows
    selectedBadges.forEach((item) => {
        const row = `
      <tr>
        <td>
          <label class="container">
            <input name="selectBadge" type="checkbox" value="{{ item.badge }}" checked>
            <div class="checkmark"></div>
          </label>
        </td>
        <td>${item.badgeName}</td>
        <td><img src="${item.badgeURL}" loading="lazy" alt="${item.badgeName}" /></td>
        <td><a href="${item.badgeURL}" target="_blank">${item.badgeURL}</a></td>
      </tr>
    `;
        tbodyEl.innerHTML += row;
    });
}
const badgeTable = document.getElementById("badgeTable");
badgeTable.addEventListener("click", function (e) {
    const target = e.target;
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
        const row = target.closest("tr");
        toggleCheckbox(row);
    }
});
