/**
 * Client-side logic for the Weather page (weather.html).
 * - Prevents page reload when the form is submitted (e.preventDefault).
 * - Sends an async POST request to the Gateway endpoint /api/v1/weather.
 * - Renders the API result in the DOM (weather card or error message).
 */
document.getElementById("weather-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const city = document.getElementById("city-input").value.trim();

    const res = await fetch("/api/v1/weather", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city })
    });

    const data = await res.json();
    const resultBox = document.getElementById("weather-result");

    if (data.error) {
        resultBox.innerHTML = `
            <div class="weather-response-box subtitle" style="color: #c0392b;">
                ${data.message}
            </div>
        `;
    } else {
        resultBox.innerHTML = `
            <div class="weather-response-box">
                <h3>${data.city}</h3>
                <img src="https://openweathermap.org/img/wn/${data.icon}@2x.png" alt="${data.description}">
                <p class="subtitle" style="text-transform: capitalize;">${data.description}</p>
                <p>Temperature: <strong>${data.temperature}°C</strong></p>
                <p>Humidity: <strong>${data.humidity}%</strong></p>
                <p>Wind: <strong>${data.windSpeed} m/s</strong></p>
            </div>
        `;
    }

    resultBox.style.display = "block";
});
