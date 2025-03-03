const mongoose = require("mongoose");

const AssetSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Asset kis user ka hai?
    type: { type: String, enum: ["bank", "property", "business", "security"], required: true }, // Asset type
    name: { type: String, required: true }, // Asset ka naam (Ex: HDFC Bank, Flat in Mumbai)
    value: { type: Number, required: true }, // Asset ki current value
    createdAt: { type: Date, default: Date.now } // Timestamp
});

module.exports = mongoose.model("Asset", AssetSchema);
