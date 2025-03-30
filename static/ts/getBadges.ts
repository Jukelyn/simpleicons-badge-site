interface SelectedBadge {
  badgeName: string;
  badgeURL: string;
  rowIndex: number;
}

const selectedBadges: SelectedBadge[] = []; // Array to store selected badges
const tbodyEl = document.querySelector(
  "#selectedBadgesTable tbody",
) as HTMLTableSectionElement;
const selectedBadgesTextarea = document.querySelector(
  "#selectedBadges",
) as HTMLTextAreaElement;

// Function to handle checkbox click and update the selected badges
function toggleCheckbox(row: HTMLElement): void {
  const checkbox = row.querySelector(
    'input[type="checkbox"]',
  ) as HTMLInputElement;
  const badgeName = row.getAttribute("data-badge-name")!;
  const badgeURL = row.getAttribute("data-badge-url")!;
  // Get the index of the row
  const rowIndex = Array.from(row.parentNode!.children).indexOf(row);

  if (checkbox.checked) {
    // Add the badge to the array (preserve row index for order)
    selectedBadges.push({ badgeName, badgeURL, rowIndex });
  } else {
    // Remove the badge from the array if unchecked
    const index = selectedBadges.findIndex(
      (item) => item.badgeURL === badgeURL,
    );
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
function updateContent(): void {
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

const badgeTable = document.getElementById("badgeTable") as HTMLTableElement;
badgeTable.addEventListener("click", function (e: MouseEvent) {
  const target = e.target as HTMLElement;
  if (target instanceof HTMLInputElement && target.type === "checkbox") {
    const row = target.closest("tr") as HTMLElement;
    toggleCheckbox(row);
  }
});
