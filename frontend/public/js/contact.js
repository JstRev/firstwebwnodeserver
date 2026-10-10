const contactForm = document.getElementById('contact-form');
const contactResult = document.getElementById('contact-result');

function renderContactResult(data) {
    if (!data || !data.ok) {
        contactResult.innerHTML = `<div class="status-message error-state">${data?.message || 'Si è verificato un errore.'}</div>`;
        return;
    }

    contactResult.innerHTML = `<div class="status-message success-state">${data.message}</div>`;
}

if (contactForm && contactResult) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('contact-name')?.value.trim();
        const email = document.getElementById('contact-email')?.value.trim();
        const message = document.getElementById('contact-message')?.value.trim();

        if (!name || !email || !message) {
            renderContactResult({ ok: false, message: 'Completa tutti i campi del form.' });
            return;
        }

        contactResult.innerHTML = '<div class="status-message loading-state">Invio del messaggio...</div>';

        setTimeout(() => {
            renderContactResult({
                ok: true,
                message: `Messaggio inviato correttamente, ${name}!`
            });
            contactForm.reset();
        }, 600);
    });
}
