async function loadNavbar() {
    const container = document.getElementById("navbar");
    if (!container) return;

    const html = await (await fetch("/api/v1/components/navbar.html")).text();
    container.innerHTML = html;

    const welcomeBadge = document.getElementById("navbar-user-name");
    const navLinks = document.querySelector(".nav-links");
    let loginLink = document.querySelector('.nav-links a[href="/api/v1/login"]');

    try {
        const response = await fetch("/api/v1/auth/me");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const user = await response.json();

        if (user.authenticated) {
            const firstName = user.firstName || user.displayName?.split(" ")[0] || "User";
            if (welcomeBadge) {
                welcomeBadge.textContent = `Welcome ${firstName}`;
            }

            if (loginLink) {
                loginLink.href = "/api/v1/auth/logout";
                loginLink.textContent = "Logout";
                loginLink.setAttribute("data-auth-action", "logout");
                return;
            }

            if (navLinks) {
                const logoutItem = document.createElement("li");
                const logoutLink = document.createElement("a");
                logoutLink.href = "/api/v1/auth/logout";
                logoutLink.textContent = "Logout";
                logoutLink.setAttribute("data-auth-action", "logout");
                logoutItem.appendChild(logoutLink);
                navLinks.appendChild(logoutItem);
            }
        } else if (welcomeBadge) {
            welcomeBadge.textContent = "Welcome";
        }
    } catch (err) {
        console.error("Impossibile verificare l'autenticazione:", err);
        if (welcomeBadge) {
            welcomeBadge.textContent = "Welcome";
        }
    }
}

window.addEventListener("DOMContentLoaded", loadNavbar);
