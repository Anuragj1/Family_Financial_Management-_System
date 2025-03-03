const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    category: { type: String, default: "Uncategorized" },
    isUnusual: { type: Boolean, default: false },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
