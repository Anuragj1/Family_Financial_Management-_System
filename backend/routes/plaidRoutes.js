const express = require("express");
const plaid = require("plaid");
const auth = require("../middleware/auth");
const router = express.Router();

const client = new plaid.PlaidApi(
    new plaid.Configuration({
        basePath: plaid.PlaidEnvironments.sandbox,
        clientId: process.env.PLAID_CLIENT_ID,
        secret: process.env.PLAID_SECRET,
    })
);

// ✅ 1. Create Link Token (Frontend Plaid Link ke liye)
router.post("/create-link-token", auth, async (req, res) => {
    try {
        console.log("🔹 Requesting Plaid Link Token...");

        const response = await client.linkTokenCreate({
            user: { client_user_id: req.user.id },  // Ensure this is valid
            client_name: "Family Finance",
            products: ["transactions"],
            country_codes: ["US"], // ✅ If using India, Plaid may not support
            language: "en",
        });

        console.log("✅ Plaid Link Token Response:", response.data);
        res.json({ link_token: response.data.link_token });
    } catch (err) {
        console.error("❌ Error creating Plaid link token:", err.response?.data || err.message);
        res.status(500).json({ msg: "Plaid Link Token Error" });
    }
});

// ✅ 2. Exchange Public Token for Access Token
router.post("/exchange-public-token", auth, async (req, res) => {
    try {
        const { public_token } = req.body;
        const response = await client.itemPublicTokenExchange({ public_token });

        res.json({ access_token: response.data.access_token });
    } catch (err) {
        console.error("Error exchanging public token:", err);
        res.status(500).json({ msg: "Plaid Token Exchange Error" });
    }
});

// ✅ 3. Fetch Transactions from Plaid API
router.get("/transactions", auth, async (req, res) => {
    try {
        const response = await client.transactionsGet({
            access_token: req.user.plaidAccessToken, 
            start_date: "2024-01-01",
            end_date: "2024-12-31",
        });

        res.json(response.data.transactions);
    } catch (err) {
        console.error("Error fetching transactions:", err);
        res.status(500).json({ msg: "Plaid Transactions Fetch Error" });
    }
});

module.exports = router;
