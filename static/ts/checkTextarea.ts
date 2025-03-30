function checkTextareaContent(): void {
  const textarea = document.getElementById(
    "selectedBadges",
  ) as HTMLTextAreaElement;

  if (textarea.value.trim() === "") {
    console.log("The textarea is empty");
    (document.getElementById("copyButton") as HTMLElement).style.display =
      "none";
    (document.getElementById("customizeButton") as HTMLElement).style.display =
      "none";
  } else {
    (document.getElementById("copyButton") as HTMLElement).style.display =
      "inline-block";
    (document.getElementById("customizeButton") as HTMLElement).style.display =
      "inline-block";
  }
}

let previousContentStr: string = "";
setInterval(() => {
  const textarea = document.getElementById(
    "selectedBadges",
  ) as HTMLTextAreaElement;
  const currentContent = textarea.value.trim();

  // Check if the content has changed
  if (currentContent !== previousContentStr) {
    console.log("Content has changed:", currentContent);
    previousContentStr = currentContent;
    checkTextareaContent();
  }
}, 200); // Polling every 200ms

document
  .getElementById("customizeButton")!
  .addEventListener("click", async function () {
    const textarea = document.getElementById(
      "selectedBadges",
    ) as HTMLTextAreaElement;
    const data = textarea.value.trim();

    if (data) {
      console.log("Sending POST request with data:", data);

      try {
        const response = await fetch("/customize", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: data }),
        });

        if (response.ok) {
          console.log("POST request successful!");
          localStorage.setItem("badgeData", data);
          window.location.href = "/customize";
        } else {
          console.log("Error sending POST request:", response);
        }
      } catch (error) {
        console.log("Error sending POST request:", error);
      }
    } else {
      console.log("The textarea is empty");
    }
  });
