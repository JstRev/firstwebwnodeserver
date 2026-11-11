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

async function updateAuthState() {
  const protectedButton = document.getElementById("protected-service-btn");

  if (!protectedButton) {
    return;
  }

  try {
    const response = await fetch("/api/v1/auth/me");
    const data = await response.json();

    protectedButton.disabled = !(response.ok && data.authenticated);
  } catch (error) {
    protectedButton.disabled = true;
  }
}

async function callProtectedService() {
  const resultBox = document.getElementById("protected-service-result");
  const button = document.getElementById("protected-service-btn");

  if (!resultBox || !button) {
    return;
  }

  button.disabled = true;
  resultBox.hidden = false;
  resultBox.textContent = "Sto verificando il login con Google...";

  try {
    const response = await fetch("/api/v1/protected/test");
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Errore HTTP ${response.status}`);
    }

    resultBox.textContent = JSON.stringify(data, null, 2);
    resultBox.style.color = "#0b6b39";
  } catch (error) {
    resultBox.textContent = error.message;
    resultBox.style.color = "#b42318";
  } finally {
    button.disabled = false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadWelcomeGif();
  updateAuthState();

  const button = document.getElementById("protected-service-btn");
  if (button) {
    button.addEventListener("click", callProtectedService);
  }
});