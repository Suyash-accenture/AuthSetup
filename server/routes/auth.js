const express = require("express");
const authController = require("../controllers/authController");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.get("/", (req, res) => {
  return res.json({ message: "Connection done" });
});
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.get("/protected", verifyToken, authController.protected);

module.exports = router;
