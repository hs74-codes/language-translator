let typingTimer;
const delay = 500;

document.getElementById("inputText").addEventListener("input", () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(translateText, delay);
});

document.getElementById("sourceLang").addEventListener("change", translateText);
document.getElementById("targetLang").addEventListener("change", translateText);

async function translateText() {
    let text = document.getElementById("inputText").value;
    let source = document.getElementById("sourceLang").value;
    let target = document.getElementById("targetLang").value;

    if (!text.trim()) {
        document.getElementById("outputText").innerText = "";
        return;
    }

    document.getElementById("outputText").innerHTML = `Translating <span class="loader"></span>`;

    try {
        let res = await fetch("/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, source, target })
        });

        let data = await res.json();
        if (data.error) {
            document.getElementById("outputText").innerText = "❌ Error: " + data.error;
        } else {
            document.getElementById("outputText").innerText = data.translated_text;
        }
    } catch (error) {
        document.getElementById("outputText").innerText = "⚠️ Translation failed.";
    }
}

function copyText() {
    let text = document.getElementById("outputText").innerText;
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
}
