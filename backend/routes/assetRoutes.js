const express = require("express");
const auth = require("../middleware/auth"); // Protected Routes Middleware
const Asset = require("../models/Asset"); // Assets Model

const router = express.Router();

// ✅ Add a New Asset
router.post("/", auth, async (req, res) => {
    const { type, name, value } = req.body;

    if (!type || !name || !value) {
        return res.status(400).json({ msg: "All fields are required!" });
    }

    try {
        const newAsset = new Asset({
            user: req.user.id,
            type,
            name,
            value
        });

        await newAsset.save();
        res.json(newAsset);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// ✅ Get All Assets of Logged-in User
router.get("/", auth, async (req, res) => {
    try {
        const assets = await Asset.find({ user: req.user.id });
        res.json(assets);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// ✅ Update Asset
router.put("/:id", auth, async (req, res) => {
    const { type, name, value } = req.body;

    try {
        let asset = await Asset.findById(req.params.id);
        if (!asset) return res.status(404).json({ msg: "Asset not found" });

        // Check ownership
        if (asset.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized" });
        }

        asset.type = type || asset.type;
        asset.name = name || asset.name;
        asset.value = value || asset.value;

        await asset.save();
        res.json(asset);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// ✅ Delete Asset
router.delete("/:id", auth, async (req, res) => {
    try {
        let asset = await Asset.findById(req.params.id);
        if (!asset) return res.status(404).json({ msg: "Asset not found" });

        // Check ownership
        if (asset.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized" });
        }

        await asset.remove();
        res.json({ msg: "Asset removed" });
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

module.exports = router;
