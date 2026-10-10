const signupForm = document.getElementById('signup-form');
const signupResult = document.getElementById('signup-result');

function renderSignupResult(data) {
    if (!data || !data.ok) {
        signupResult.innerHTML = `<div class="status-message error-state">${data?.message || 'Si è verificato un errore.'}</div>`;
        return;
    }

    signupResult.innerHTML = `<div class="status-message success-state">${data.message}</div>`;
}

if (signupForm && signupResult) {
    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const password = document.getElementById('password')?.value.trim();

        if (!name || !email || !password) {
            renderSignupResult({ ok: false, message: 'Completa tutti i campi richiesti.' });
            return;
        }

        signupResult.innerHTML = '<div class="status-message loading-state">Registrazione in corso...</div>';

        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (!response.ok || !data.ok) {
                throw new Error(data.message || 'Errore durante la registrazione.');
            }

            renderSignupResult(data);
            signupForm.reset();
        } catch (error) {
            renderSignupResult({ ok: false, message: error.message || 'Si è verificato un errore.' });
        }
    });
}
