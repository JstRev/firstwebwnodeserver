const loginUser = (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "1234") {
        return res.send("Login è avvenuto con successo!");
    }

    return res.send(
        "Login fallito. <br> Username inserito: " +
        username +
        " <br> Password inserita: " +
        password +
        "."
    );
};

module.exports = {
    loginUser,
};
