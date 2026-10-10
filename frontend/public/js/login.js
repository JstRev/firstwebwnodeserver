const loginForm = document.getElementById('login-form');
const loginResult = document.getElementById('login-result');

function renderLoginResult(data) {
    if (!data || !data.ok) {
        loginResult.innerHTML = `<div class="status-message error-state">${data?.message || 'Si è verificato un errore.'}</div>`;
        return;
    }

    loginResult.innerHTML = `<div class="status-message success-state">${data.message}</div>`;
}

if (loginForm && loginResult) {
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('username')?.value.trim();
        const password = document.getElementById('password')?.value.trim();

        if (!username || !password) {
            renderLoginResult({ ok: false, message: 'Username e password richiesti.' });
            return;
        }

        loginResult.innerHTML = '<div class="status-message loading-state">Accesso in corso...</div>';

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (!response.ok || !data.ok) {
                throw new Error(data.message || 'Errore durante il login.');
            }

            renderLoginResult(data);
            loginForm.reset();
        } catch (error) {
            renderLoginResult({ ok: false, message: error.message || 'Si è verificato un errore.' });
        }
    });
}
