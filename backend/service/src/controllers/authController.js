const registeredUsers = [];

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body || {};

        if (!username || !password) {
            return res.status(400).json({
                ok: false,
                message: 'Username e password richiesti.'
            });
        }

        if (username === 'admin' && password === '1234') {
            return res.json({
                ok: true,
                message: 'Login effettuato con successo!'
            });
        }

        return res.status(401).json({
            ok: false,
            message: 'Credenziali non valide.'
        });
    } catch (err) {
        console.error('loginUser error:', err);
        return res.status(500).json({
            ok: false,
            message: 'Errore nel server'
        });
    }
};

exports.signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body || {};

        if (!name || !email || !password) {
            return res.status(400).json({
                ok: false,
                message: 'Nome, email e password richiesti.'
            });
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            return res.status(400).json({
                ok: false,
                message: 'Inserisci un indirizzo email valido.'
            });
        }

        const alreadyExists = registeredUsers.some((user) => user.email.toLowerCase() === email.toLowerCase());
        if (alreadyExists) {
            return res.status(409).json({
                ok: false,
                message: 'Email già registrata.'
            });
        }

        registeredUsers.push({ name, email, password });

        return res.status(201).json({
            ok: true,
            message: `Registrazione completata per ${name}!`
        });
    } catch (err) {
        console.error('signupUser error:', err);
        return res.status(500).json({
            ok: false,
            message: 'Errore nel server'
        });
    }
};
