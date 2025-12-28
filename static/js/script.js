function checkStrength() {
    const password = document.getElementById("password").value;
    const result = document.getElementById("result");

    if (!password) {
        result.innerText = "⚠️ Please enter a password";
        return;
    }

    fetch("/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ password: password })
    })
    .then(response => response.json())
    .then(data => {
        result.innerText = "Strength: " + data.strength;
    })
    .catch(error => {
        result.innerText = "❌ Error checking password strength";
    });
}
