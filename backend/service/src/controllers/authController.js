const loginUser = (req, res) => {
    const { username, password } = req.body || {};

    if (username === "admin" && password === "1234") {
        return res.send("Login è avvenuto con successo!");
    }

    return res.status(401).send("Credenziali non valide.");
};

module.exports = {
    loginUser,
};
