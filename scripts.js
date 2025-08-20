// Loader logic
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    const card = document.getElementById("card");

    setTimeout(() => {
        loader.classList.add("opacity-0");
        loader.style.transition = "opacity 1s ease-in-out";

        // Remove loader & show card after fade
        setTimeout(() => {
            loader.style.display = "none";
            card.classList.remove("opacity-0", "pointer-events-none");
            card.classList.add("opacity-100"); // fade in
        }, 1000); // matches loader fade time
    }, 2000); // loader delay
});


// Password toggle
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", () => {
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
});

// Validation ug redirect
document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    let valid = true;

    // Username check
    if (!username.value.trim()) {
        document.getElementById("usernameError").classList.remove("hidden");
        valid = false;
    } else {
        document.getElementById("usernameError").classList.add("hidden");
    }

    // Password check
    if (!password.value.trim()) {
        document.getElementById("passwordError").classList.remove("hidden");
        valid = false;
    } else {
        document.getElementById("passwordError").classList.add("hidden");
    }

    // If valid inputs, check login credentials
    if (valid) {
        if (username.value === "Meuserako123" && password.value === "password12345") {
            window.location.href = "index.html"; // redirect
        } else {
            const loginError = document.getElementById("loginError");
            loginError.classList.remove("hidden");

            
            setTimeout(() => {
                loginError.classList.add("hidden");
            }, 3000);
        }
    }
});

// Shadow effect sa login form
const card = document.getElementById("card");

document.addEventListener("mousemove", (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 30; // range: -15 to +15
    const y = (e.clientY / innerHeight - 0.5) * 30;

    card.style.boxShadow = `
        ${x}px ${y}px 30px rgba(0,0,0,0.3),
        ${-x}px ${-y}px 30px rgba(255,255,255,0.9)
    `;
});
