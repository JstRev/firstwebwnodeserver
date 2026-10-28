// Chiede al servizio wanted la scheda del giorno e la mostra nella pagina.
async function loadWantedPerson() {
    const result = document.getElementById("fbi-result");

    try {
        // Se la pagina è aperta direttamente sulla porta 3002 usiamo /api/wanted/today,
        // altrimenti tramite gateway (porta 4000) usiamo il prefisso /api/v1/wanted/api/wanted/today.
        const endpoint = (window.location.port === "3002" || !window.location.pathname.includes("/api/v1"))
            ? "/api/wanted/today"
            : "/api/v1/wanted/api/wanted/today";

        const response = await fetch(endpoint);
        const person = await response.json();

        if (!response.ok) {
            throw new Error(person.error || "Servizio non disponibile");
        }

        // Creiamo gli elementi in modo sicuro evitando innerHTML con contenuto non sanitizzato
        const title = document.createElement("h2");
        title.textContent = person.title;
        result.replaceChildren(title);

        if (person.image) {
            const image = document.createElement("img");
            image.src = person.image;
            image.alt = person.title;
            image.className = "fbi-image";
            result.append(image);
        }

        if (person.description) {
            const description = document.createElement("p");
            description.textContent = person.description;
            description.className = "fbi-description";
            result.append(description);
        }

        if (Array.isArray(person.subjects) && person.subjects.length > 0) {
            const subjects = document.createElement("p");
            subjects.textContent = `Categoria: ${person.subjects.join(", ")}`;
            result.append(subjects);
        }

        if (person.reward) {
            const reward = document.createElement("p");
            reward.textContent = person.reward;
            reward.className = "fbi-reward";
            result.append(reward);
        }

        if (person.url) {
            const link = document.createElement("a");
            link.href = person.url;
            link.textContent = "Apri la scheda ufficiale FBI";
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.className = "fbi-link";
            result.append(link);
        }
    } catch (error) {
        result.textContent = error.message || "Non è stato possibile caricare la scheda FBI.";
    }
}

document.addEventListener("DOMContentLoaded", loadWantedPerson);

