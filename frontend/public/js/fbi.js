/**
 * Client-side logic for the FBI page (FBI.html).
 * - Requests the daily wanted notice from the Gateway (/api/v1/wanted/api/wanted/today).
 * - Builds dynamic HTML elements (title, image, description, category, link)
 *   using textContent to prevent XSS vulnerabilities.
 */
async function loadWantedPerson() {
    const result = document.getElementById("fbi-result");

    try {
        const response = await fetch("/api/v1/wanted/api/wanted/today");
        const person = await response.json();

        if (!response.ok) {
            throw new Error(person.error || "Service unavailable");
        }

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
            subjects.textContent = `Category: ${person.subjects.join(", ")}`;
            result.append(subjects);
        }

        if (person.reward) {
            const reward = document.createElement("p");
            reward.textContent = person.reward;
            result.append(reward);
        }

        if (person.url) {
            const link = document.createElement("a");
            link.href = person.url;
            link.textContent = "Open the official FBI profile";
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            result.append(link);
        }
    } catch (error) {
        result.textContent = error.message || "It was not possible to load the FBI profile.";
    }
}

loadWantedPerson();
