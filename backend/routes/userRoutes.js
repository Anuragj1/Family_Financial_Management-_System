const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/User");

const router = express.Router();

console.log("✅ User Routes Loaded!");

// ✅ Admin Can Add Family Members
router.post("/add-member", auth, async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ msg: "Access denied! Only admin can add members." });
        }

        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({ msg: "All fields are required!" });
        }

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ 
            name, 
            email, 
            password: hashedPassword, 
            role, 
            adminId: req.user.id  // ✅ Link member to admin 
        });

        await user.save();

        res.json({ msg: "Family member added successfully!" });
    } catch (error) {
        console.error("❌ Error adding member:", error);
        res.status(500).json({ msg: "Server error" });
    }
});


module.exports = router;
