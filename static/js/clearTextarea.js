"use strict";
function clearTextarea() {
    const textarea = document.getElementById("customizedBadges");
    const clearButton = document.getElementById("clearButton");
    const copyButton = document.getElementById("copyButton");
    if (textarea && textarea.value) {
        textarea.value = "";
        clearButton.style.display = "none";
        copyButton.style.display = "none";
    }
}
function checkTextareaChange() {
    const textarea = document.getElementById("customizedBadges");
    const currentContent = textarea.value.trim();
    // Check if the content has changed and show/hide the clear button
    const clearButton = document.getElementById("clearButton");
    if (currentContent !== "") {
        clearButton.style.display = "inline-block";
    }
    else {
        clearButton.style.display = "none";
    }
}
let previousContentString = "";
setInterval(() => {
    const textarea = document.getElementById("customizedBadges");
    const currentContent = textarea.value.trim();
    if (currentContent !== previousContentString) {
        previousContentString = currentContent;
        checkTextareaChange();
    }
}, 200); // Polling every 200ms
