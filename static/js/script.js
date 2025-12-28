function checkStrength() {
    const password = document.getElementById("password").value;
    const result = document.getElementById("result");
    const meterFill = document.getElementById("meterFill");
    const lengthValue = document.getElementById("lengthValue");
    const crackTime = document.getElementById("crackTime");
    const securityTips = document.getElementById("securityTips");
    
    // Reset UI elements
    result.innerText = "Analyzing...";
    result.style.color = "#94a3b8";
    meterFill.style.width = "0%";
    lengthValue.textContent = "0";
    crackTime.textContent = "--";
    securityTips.textContent = "--";
    
    // Update password requirements UI
    updateRequirementsUI(password);
    
    if (!password) {
        result.innerText = "⚠️ Please enter a password";
        result.style.color = "#fbbf24";
        return;
    }
    
    // Update length display
    lengthValue.textContent = password.length;
    
    // Fetch strength from backend
    fetch("/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ password: password })
    })
    .then(response => response.json())
    .then(data => {
        // Update result text
        result.innerText = "Strength: " + data.strength;
        
        // Update result color based on strength
        if (data.strength === "Weak") {
            result.style.color = "#ef4444";
            meterFill.style.width = "33%";
            crackTime.textContent = "Instantly";
            securityTips.textContent = "Add more characters, mix character types";
        } else if (data.strength === "Medium") {
            result.style.color = "#f59e0b";
            meterFill.style.width = "66%";
            crackTime.textContent = "Days to weeks";
            securityTips.textContent = "Add special characters, increase length";
        } else {
            result.style.color = "#22c55e";
            meterFill.style.width = "100%";
            crackTime.textContent = "Years to centuries";
            securityTips.textContent = "Excellent! Consider using a password manager";
        }
    })
    .catch(error => {
        result.innerText = "❌ Error checking password strength";
        result.style.color = "#ef4444";
        console.error("Error:", error);
    });
}

// Function to update password requirements UI in real-time
function updateRequirementsUI(password) {
    // Check length requirement
    const reqLength = document.getElementById("req-length");
    if (password.length >= 8) {
        reqLength.classList.add("valid");
        reqLength.innerHTML = '<i class="fas fa-check-circle"></i> At least 8 characters';
    } else {
        reqLength.classList.remove("valid");
        reqLength.innerHTML = '<i class="fas fa-ruler"></i> At least 8 characters';
    }
    
    // Check case requirement
    const reqCase = document.getElementById("req-case");
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    if (hasUpperCase && hasLowerCase) {
        reqCase.classList.add("valid");
        reqCase.innerHTML = '<i class="fas fa-check-circle"></i> Upper & lowercase';
    } else {
        reqCase.classList.remove("valid");
        reqCase.innerHTML = '<i class="fas fa-font"></i> Upper & lowercase';
    }
    
    // Check number requirement
    const reqNumber = document.getElementById("req-number");
    const hasNumber = /\d/.test(password);
    if (hasNumber) {
        reqNumber.classList.add("valid");
        reqNumber.innerHTML = '<i class="fas fa-check-circle"></i> Contains number';
    } else {
        reqNumber.classList.remove("valid");
        reqNumber.innerHTML = '<i class="fas fa-hashtag"></i> Contains number';
    }
    
    // Check special character requirement
    const reqSpecial = document.getElementById("req-special");
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    if (hasSpecial) {
        reqSpecial.classList.add("valid");
        reqSpecial.innerHTML = '<i class="fas fa-check-circle"></i> Special character';
    } else {
        reqSpecial.classList.remove("valid");
        reqSpecial.innerHTML = '<i class="fas fa-star"></i> Special character';
    }
}

// Toggle password visibility
document.addEventListener("DOMContentLoaded", function() {
    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener("click", function() {
            const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
            passwordInput.setAttribute("type", type);
            
            // Toggle eye icon
            if (type === "text") {
                this.innerHTML = '<i class="fas fa-eye-slash"></i>';
            } else {
                this.innerHTML = '<i class="fas fa-eye"></i>';
            }
        });
    }
    
    // Update requirements as user types
    if (passwordInput) {
        passwordInput.addEventListener("input", function() {
            updateRequirementsUI(this.value);
            
            // Update length display in real-time
            document.getElementById("lengthValue").textContent = this.value.length;
        });
    }
    
    // Allow pressing Enter to check strength
    passwordInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            checkStrength();
        }
    });
});