const express = require("express");
const auth = require("../middleware/auth"); // JWT Middleware Import Karo

const router = express.Router();

// ✅ Protected Dashboard Route
router.get("/dashboard", auth, (req, res) => {
    res.json({ msg: `Welcome, ${req.user.role}!`, user: req.user });
});

module.exports = router;
