/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
function copyToClipboard(targetTextareaId: string): void {
  const textarea = document.getElementById(
    targetTextareaId,
  ) as HTMLTextAreaElement;
  if (textarea && textarea.value) {
    navigator.clipboard
      .writeText(textarea.value)
      .then(() => {
        console.log("Content copied to clipboard!");
        showModal();
      })
      .catch((error: Error) => {
        alert("Failed to copy content: " + error.message);
      });
  }
}

function showModal(): void {
  const modal = document.getElementById("popupModal") as HTMLElement;
  modal.style.display = "block";

  const closeModalButton = document.getElementById("closeModal") as HTMLElement;
  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  setTimeout(() => {
    modal.style.display = "none";
  }, 3000);
}
