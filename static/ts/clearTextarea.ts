/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
function clearTextarea(): void {
  const textarea = document.getElementById(
    "customizedBadges",
  ) as HTMLTextAreaElement;
  const clearButton = document.getElementById("clearButton") as HTMLElement;
  const copyButton = document.getElementById("copyButton") as HTMLElement;

  if (textarea && textarea.value) {
    textarea.value = "";
    clearButton.style.display = "none";
    copyButton.style.display = "none";
  }
}

function checkTextareaChange(): void {
  const textarea = document.getElementById(
    "customizedBadges",
  ) as HTMLTextAreaElement;
  const currentContent = textarea.value.trim();

  // Check if the content has changed and show/hide the clear button
  const clearButton = document.getElementById("clearButton") as HTMLElement;
  if (currentContent !== "") {
    clearButton.style.display = "inline-block";
  } else {
    clearButton.style.display = "none";
  }
}

let previousContentString: string = "";
setInterval(() => {
  const textarea = document.getElementById(
    "customizedBadges",
  ) as HTMLTextAreaElement;
  const currentContent = textarea.value.trim();

  if (currentContent !== previousContentString) {
    previousContentString = currentContent;
    checkTextareaChange();
  }
}, 200); // Polling every 200ms
