const express = require("express");
const auth = require("../middleware/auth");
const Transaction = require("../models/Transaction");

const router = express.Router();

// ✅ Function to Auto-Categorize Transactions
const categorizeTransaction = (name, amount) => {
    const categories = [
        { keywords: ["grocery", "supermarket", "food", "market"], category: "Food" },
        { keywords: ["uber", "lyft", "taxi", "bus", "metro"], category: "Transport" },
        { keywords: ["amazon", "flipkart", "shopping", "mall"], category: "Shopping" },
        { keywords: ["gym", "fitness", "health"], category: "Health" },
        { keywords: ["hotel", "airbnb", "travel", "trip"], category: "Travel" },
    ];

    for (let cat of categories) {
        if (cat.keywords.some((keyword) => name.toLowerCase().includes(keyword))) {
            return cat.category;
        }
    }
    return amount > 5000 ? "High-Value Transaction" : "Other";
};

// ✅ Add New Transaction
router.post("/add", auth, async (req, res) => {
    try {
        const { name, amount, date } = req.body;
        if (!name || !amount || !date) {
            return res.status(400).json({ msg: "Missing required fields!" });
        }

        const category = categorizeTransaction(name, amount);
        const isUnusual = amount > 10000; // Alert if transaction is above ₹10,000

        const transaction = new Transaction({
            userId: req.user.id,
            name,
            amount,
            date,
            category,
            isUnusual,
        });

        await transaction.save();
        res.json({ msg: "Transaction added successfully!", transaction });
    } catch (error) {
        console.error("Error adding transaction:", error);
        res.status(500).json({ msg: "Transaction save error" });
    }
});


// ✅ Fetch user transactions
router.get("/", auth, async (req, res) => {
    try {
        let transactions;
        
        if (req.user.role === "admin") {
            transactions = await Transaction.find(); // Admin sees all transactions
        } else {
            transactions = await Transaction.find({ userId: req.user.id }); // Members see only their own transactions
        }

        res.json(transactions);
    } catch (error) {
        console.error("❌ Error fetching transactions:", error);
        res.status(500).json({ msg: "Error fetching transactions" });
    }
});

// ✅ Detect suspicious transactions
router.get("/alerts", auth, async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user.id, isUnusual: true });

        const alerts = transactions.map((txn) => ({
            message: `⚠️ High-Value Transaction: ₹${txn.amount} spent on ${txn.name}`,
            date: txn.date,
        }));

        res.json(alerts);
    } catch (error) {
        console.error("Error fetching alerts:", error);
        res.status(500).json({ msg: "Error fetching transaction alerts" });
    }
});

router.get("/bank-details", auth, async (req, res) => {
    try {
        if (req.user.role === "admin") {
            return res.status(403).json({ msg: "Admins cannot access individual bank details." });
        }

        const transactions = await Transaction.find({ userId: req.user.id });
        res.json(transactions);
    } catch (error) {
        console.error("❌ Error fetching bank details:", error);
        res.status(500).json({ msg: "Server error" });
    }
});


module.exports = router;

module.exports = router;
