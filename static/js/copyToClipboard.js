"use strict";
function copyToClipboard(targetTextareaId) {
    const textarea = document.getElementById(targetTextareaId);
    if (textarea && textarea.value) {
        navigator.clipboard
            .writeText(textarea.value)
            .then(() => {
            console.log("Content copied to clipboard!");
            showModal();
        })
            .catch((error) => {
            alert("Failed to copy content: " + error.message);
        });
    }
}
function showModal() {
    const modal = document.getElementById("popupModal");
    modal.style.display = "block";
    const closeModalButton = document.getElementById("closeModal");
    closeModalButton.addEventListener("click", () => {
        modal.style.display = "none";
    });
    setTimeout(() => {
        modal.style.display = "none";
    }, 3000);
}
