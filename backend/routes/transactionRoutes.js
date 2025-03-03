const express = require("express");
const auth = require("../middleware/auth");
const Transaction = require("../models/Transaction");
const router = express.Router();

// ✅ Debug Console Log
console.log("Transaction Routes Loaded!");

// ✅ Add a new transaction
router.post("/add", auth, async (req, res) => {
    // console.log("🔹 POST /api/transactions/add hit!");  // Debugging

    try {
        const { amount, type, category, description, date } = req.body;
        // console.log("Transaction Data:", req.body);  // Debugging

        const transaction = new Transaction({
            user: req.user.id,
            amount,
            type,
            category,
            description,
            date
        });
        // console.log("📝 New Transaction:", transaction);  // Debugging
        await transaction.save();
        res.status(201).json(transaction);
    } catch (err) {
        console.error("❌ Error adding transaction:", err);
        res.status(500).json({ msg: "Server Error" });
    }
});

// ✅ Fetch user transactions
router.get("/", auth, async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
        res.json(transactions);
    } catch (err) {
        console.error("Error fetching transactions:", err);
        res.status(500).json({ msg: "Server Error" });
    }
});

// ✅ Detect suspicious transactions
router.get("/alerts", auth, async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.id });
        let alerts = [];
        
        transactions.forEach(tx => {
            if (tx.amount > 10000) { 
                alerts.push({
                    message: `High-value transaction detected: ₹${tx.amount}`,
                    transaction: tx
                });
            }
            if (tx.category === "Unknown" || tx.description.includes("Suspicious")) { 
                alerts.push({
                    message: `Suspicious transaction detected: ${tx.description}`,
                    transaction: tx
                });
            }
        });
        
        res.json(alerts);
    } catch (err) {
        console.error("Error detecting suspicious transactions:", err);
        res.status(500).json({ msg: "Server Error" });
    }
});

module.exports = router;
