const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SECRET_KEY = "your_secret_key"; // Use env in production

let refreshTokens = new Set();

const authController = {
  signup: async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ message: "Username and password required" });

    const existingUser = User.findByUsername(username);
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    User.create(username, password);
    res.status(201).json({ message: "User created" });
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ message: "Username and password required" });

    const user = User.findByUsername(username);
    if (!user || !User.verifyPassword(user, password))
      return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = jwt.sign({ username: user.username }, SECRET_KEY, {
      expiresIn: "1m",
    });
    const refreshToken = jwt.sign({ username: user.username }, SECRET_KEY, {
      expiresIn: "7d",
    });
    refreshTokens.add(refreshToken);
    res.json({ accessToken, refreshToken });
  },

  refresh: (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken || !refreshTokens.has(refreshToken))
      return res.status(403).json({ message: "Invalid refresh token" });

    jwt.verify(refreshToken, SECRET_KEY, (err, user) => {
      if (err)
        return res.status(403).json({ message: "Invalid refresh token" });
      const accessToken = jwt.sign({ username: user.username }, SECRET_KEY, {
        expiresIn: "1m",
      });
      res.json({ accessToken });
    });
  },

  protected: (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
  },
};

module.exports = authController;
