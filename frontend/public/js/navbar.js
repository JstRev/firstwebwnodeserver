// Va incluso in ogni pagina al posto dello script inline che faceva fetch 
// della navbar:
//novo DOM della navbar
async function loadNavbar() {
    const container = document.getElementById("navbar");
    if (!container) return;

    const html = await (await fetch("/api/v1/components/navbar.html")).text();
    container.innerHTML = html;

    const welcomeBadge = document.getElementById("navbar-user-name");
    const loginLink = document.querySelector('.nav-links a[href="/api/v1/login"]');

    try {
        const response = await fetch("/api/v1/auth/me");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const user = await response.json();

        if (user.authenticated) {
            const firstName = user.firstName || user.displayName?.split(" ")[0] || "User";
            welcomeBadge.textContent = `Welcome ${firstName}`;

            if (loginLink) {
                loginLink.href = "/api/v1/auth/logout";
                loginLink.textContent = "Logout";
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
