const form = document.getElementById('weather-form');
const resultBox = document.getElementById('weather-result');

function renderResult(data) {
    if (!data || !data.ok) {
        resultBox.innerHTML = `<div class="error-state">${data?.message || 'Si è verificato un errore.'}</div>`;
        return;
    }

    resultBox.innerHTML = `
        <div class="weather-result-card">
            <div class="weather-city">Meteo a ${data.city}</div>
            <div class="weather-condition">${data.condition}</div>
            <div class="weather-temp">${data.temperature}°C</div>
            <div class="weather-message">${data.message}</div>
        </div>
    `;
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const city = (formData.get('city') || '').toString().trim();

    if (!city) {
        renderResult({ ok: false, message: 'Inserisci il nome di una città.' });
        return;
    }

    resultBox.innerHTML = '<div class="loading-state">Sto cercando il meteo...</div>';

    try {
        const response = await fetch('/weather', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Errore nella richiesta meteo.');
        }

        renderResult(data);
    } catch (error) {
        renderResult({ ok: false, message: error.message || 'Si è verificato un errore.' });
    }
});
