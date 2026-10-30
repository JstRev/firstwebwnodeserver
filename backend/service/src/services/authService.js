// In-memory user storage for local credentials
const users = new Map();

// Default admin user
users.set("admin", {
    username: "admin",
    password: "1234",
    email: "admin@skyflow.app",
    role: "Administrator",
    createdAt: new Date().toISOString()
});

function authenticateUser(username, password) {
    if (!username || !password) {
        return {
            success: false,
            message: "Username and password are required."
        };
    }

    const trimmedUsername = username.trim();
    const user = users.get(trimmedUsername);

    if (!user || user.password !== password) {
        return {
            success: false,
            message: "Invalid credentials. Please verify your username and password."
        };
    }

    return {
        success: true,
        message: "Authentication successful.",
        user: {
            username: user.username,
            email: user.email || `${user.username}@skyflow.app`,
            role: user.role || "Member"
        }
    };
}

function registerUser(username, password, email) {
    if (!username || !password) {
        return {
            success: false,
            message: "Username and password are required."
        };
    }

    const trimmedUsername = username.trim();

    if (trimmedUsername.length < 3) {
        return {
            success: false,
            message: "Username must be at least 3 characters long."
        };
    }

    if (password.length < 4) {
        return {
            success: false,
            message: "Password must be at least 4 characters long."
        };
    }

    if (users.has(trimmedUsername)) {
        return {
            success: false,
            message: `User '${trimmedUsername}' already exists. Please choose a different username.`
        };
    }

    const newUser = {
        username: trimmedUsername,
        password: password,
        email: email || `${trimmedUsername}@skyflow.app`,
        role: "Member",
        createdAt: new Date().toISOString()
    };

    users.set(trimmedUsername, newUser);

    return {
        success: true,
        message: `Account created successfully for ${trimmedUsername}!`,
        user: {
            username: newUser.username,
            email: newUser.email,
            role: newUser.role
        }
    };
}

module.exports = {
    authenticateUser,
    registerUser,
    users
};
