async function loadWelcomeGif() {
  try {
    const response = await fetch("/api/v1/auth/me");

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const user = await response.json();

    if (!user.authenticated) {
      return;
    }

    const welcomeContent = document.getElementById("welcome-content");

    if (!welcomeContent) {
      return;
    }

    if (welcomeContent.querySelector(".welcome-box")) {
      return;
    }

    const box = document.createElement("div");
    box.className = "welcome-box";

    const img = document.createElement("img");
    img.src = "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjcxYzZyMzJzajJtNmNnZ3VpNjdzcGx5cWdoMW9xcWNhYTFkdnEyaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/blSTtZehjAZ8I/giphy.gif";
    img.alt = "Welcome Gif";
    img.loading = "lazy";

    box.appendChild(img);
    welcomeContent.appendChild(box);
  } catch (err) {
    console.error("Errore caricamento gif di benvenuto:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadWelcomeGif);