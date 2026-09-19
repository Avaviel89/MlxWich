function showError(id, message) {
    const group = document.getElementById(id).parentElement;
    const error = group.querySelector(".error-message");

    group.classList.add("error");
    if (error) error.textContent = message;
}

function clearError(id) {
    document.getElementById(id).parentElement.classList.remove("error");
}

function validateRegistrationForm(e) {
    e.preventDefault();

    let valid = true;

    const fullName = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phoneNumber").value.trim();
    const email = document.getElementById("email").value.trim();
    const product = document.getElementById("productChoice").value;
    const address = document.getElementById("address").value.trim();

    ["fullName", "phoneNumber", "email", "productChoice", "address"]
        .forEach(clearError);

    if (fullName.length < 3) {
        showError("fullName", "Name must be at least 3 characters");
        valid = false;
    }

    if (!/^\+?\d{10,15}$/.test(phone)) {
        showError("phoneNumber", "Enter a valid phone number");
        valid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError("email", "Enter a valid email address");
        valid = false;
    }

    if (product === "") {
        showError("productChoice", "Please choose a product");
        valid = false;
    }

    if (address.length < 10) {
        showError("address", "Address must be at least 10 characters");
        valid = false;
    }

    if (!valid) return;

    const data = {
        fullName,
        phoneNumber: phone,
        email,
        productChoice: product,
        address
    };

    sessionStorage.setItem("registrationData", JSON.stringify(data));

    document.querySelector(".form-container").style.display = "none";
    document.querySelector(".success-container").style.display = "flex";
}

function resetForm() {
    document.querySelector(".success-container").style.display = "none";
    document.querySelector(".form-container").style.display = "block";
    document.getElementById("registerForm").reset();
}

function toggleMobileMenu() {
    document.querySelector(".mobile-nav").classList.toggle("active");
}

function filterMenu(category) {
    const items = document.querySelectorAll(".menu-item");

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.toggle(
            "active",
            btn.dataset.category === category
        );
    });

    items.forEach(item => {
        item.style.display =
            category === "all" || item.dataset.category === category
                ? "block"
                : "none";
    });
}

function setActiveNav() {
    const current =
        window.location.pathname.split("/").pop() || "index.html";

    document
        .querySelectorAll("nav a, .mobile-nav a")
        .forEach(link => {
            if (link.getAttribute("href") === current) {
                link.classList.add("active");
            }
        });
}

document.addEventListener("DOMContentLoaded", () => {
    setActiveNav();

    const form = document.getElementById("registerForm");
    if (form) {
        form.addEventListener("submit", validateRegistrationForm);

        document.querySelectorAll("input, select, textarea")
            .forEach(field => {
                field.addEventListener("input", () => {
                    clearError(field.id);
                });
            });
    }

    const menuBtn = document.querySelector(".mobile-menu-btn");
    if (menuBtn) {
        menuBtn.addEventListener("click", toggleMobileMenu);
    }
});