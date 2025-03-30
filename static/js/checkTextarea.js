"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function checkTextareaContent() {
    const textarea = document.getElementById("selectedBadges");
    if (textarea.value.trim() === "") {
        console.log("The textarea is empty");
        document.getElementById("copyButton").style.display =
            "none";
        document.getElementById("customizeButton").style.display =
            "none";
    }
    else {
        document.getElementById("copyButton").style.display =
            "inline-block";
        document.getElementById("customizeButton").style.display =
            "inline-block";
    }
}
let previousContentStr = "";
setInterval(() => {
    const textarea = document.getElementById("selectedBadges");
    const currentContent = textarea.value.trim();
    // Check if the content has changed
    if (currentContent !== previousContentStr) {
        console.log("Content has changed:", currentContent);
        previousContentStr = currentContent;
        checkTextareaContent();
    }
}, 200); // Polling every 200ms
document
    .getElementById("customizeButton")
    .addEventListener("click", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const textarea = document.getElementById("selectedBadges");
        const data = textarea.value.trim();
        if (data) {
            console.log("Sending POST request with data:", data);
            try {
                const response = yield fetch("/customize", {
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
                }
                else {
                    console.log("Error sending POST request:", response);
                }
            }
            catch (error) {
                console.log("Error sending POST request:", error);
            }
        }
        else {
            console.log("The textarea is empty");
        }
    });
});
