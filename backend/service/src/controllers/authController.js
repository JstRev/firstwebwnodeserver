exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body || {};

        if (!username || !password) {
            return res.status(400).json({
                error: true,
                message: 'Username e password richiesti.'
            });
        }

        if (username === 'admin' && password === '1234') {
            return res.json({
                error: false,
                message: 'Login effettuato con successo!'
            });
        }

        return res.status(401).json({
            error: true,
            message: 'Credenziali non valide.'
        });
    } catch (err) {
        console.error('loginUser error:', err);
        return res.status(500).json({
            error: true,
            message: 'Errore nel server'
        });
    }
};
