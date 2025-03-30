"use strict";
// Event listener for cell clicks
document.querySelectorAll("#badge-table td").forEach((cell) => {
    cell.addEventListener("click", function () {
        const textarea = document.getElementById("customizedBadges");
        const img = this.querySelector("img");
        const imgUrl = img.src;
        const altText = img.alt;
        // Toggle the highlight on the clicked cell
        this.classList.toggle("highlight");
        const formattedUrl = `![${altText}](${imgUrl})`;
        // Add or remove the URL from the textarea based on the highlight
        if (this.classList.contains("highlight")) {
            if (!textarea.value.includes(formattedUrl)) {
                textarea.value += formattedUrl + "\n";
            }
        }
        else {
            textarea.value = textarea.value
                .split("\n")
                .filter((url) => url !== formattedUrl)
                .join("\n");
        }
        // Check if there's content in the textarea
        checkTextareaEmpty();
    });
});
// Function to check textarea content and display the button
function checkTextareaEmpty() {
    const textarea = document.getElementById("customizedBadges");
    const copyButton = document.getElementById("copyButton");
    if (textarea.value.trim() !== "") {
        copyButton.style.display = "inline-block";
    }
    else {
        copyButton.style.display = "none";
    }
}
