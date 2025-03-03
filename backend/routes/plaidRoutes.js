const express = require("express");
const plaid = require("plaid");
const auth = require("../middleware/auth");
const router = express.Router();
const User = require("../models/user"); // ✅ Add this line at the top


// const client = new plaid.PlaidApi(
//     new plaid.Configuration({
//         basePath: plaid.PlaidEnvironments.sandbox,
//         clientId: process.env.PLAID_CLIENT_ID,
//         secret: process.env.PLAID_SECRET,
//     })
// );

const client = new plaid.PlaidApi(
    new plaid.Configuration({
        basePath: plaid.PlaidEnvironments.sandbox,
        baseOptions: {
            headers: {
                "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
                "PLAID-SECRET": process.env.PLAID_SECRET,
                "Plaid-Version": "2020-09-14",
            },
        },
    })
);


// console.log("🔍 PLAID_CLIENT_ID:", process.env.PLAID_CLIENT_ID);
// console.log("🔍 PLAID_SECRET:", process.env.PLAID_SECRET);


router.post("/create-link-token", auth, async (req, res) => {
    try {
        console.log("🔹 Requesting Plaid Link Token...");

        const response = await client.linkTokenCreate({
            user: { client_user_id: req.user.id }, 
            client_name: "Family Finance",
            products: ["transactions"],
            country_codes: ["US"],
            language: "en",
        });

        // console.log("✅ Plaid Link Token Response:", response.data);
        res.json({ link_token: response.data.link_token });
    } catch (err) {
        console.error("❌ Error creating Plaid link token:", err.response?.data || err.message);
        res.status(500).json({ msg: "Plaid Link Token Error" });
    }
});



router.post("/exchange-public-token", auth, async (req, res) => {
    try {
        const { public_token } = req.body;
        console.log("🔹 Received Public Token:", public_token);

        const response = await client.itemPublicTokenExchange({ public_token });

        console.log("✅ Access Token Generated:", response.data.access_token);
        
        // ✅ Save access_token to the user in database
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: "User not found!" });
        }

        user.plaidAccessToken = response.data.access_token;
        await user.save();

        res.json({ access_token: response.data.access_token });
    } catch (err) {
        console.error("❌ Error exchanging public token:", err.response?.data || err.message);
        res.status(500).json({ msg: "Plaid Token Exchange Error" });
    }
});


router.get("/transactions", auth, async (req, res) => {
    try {
        console.log("✅ Fetch Transactions API Hit!");

        // 🔹 Get user from database
        const user = await User.findById(req.user.id);
        if (!user || !user.plaidAccessToken) {
            console.error("❌ No Access Token Found in Database!");
            return res.status(400).json({ msg: "Access token missing!" });
        }

        const response = await client.transactionsGet({
            access_token: user.plaidAccessToken,
            start_date: "2024-01-01",
            end_date: "2024-12-31",
        });

        console.log("✅ Transactions Fetched:", response.data.transactions);
        res.json(response.data.transactions);
    } catch (err) {
        console.error("❌ Error fetching transactions:", err.response?.data || err.message);
        res.status(500).json({ msg: "Plaid Transactions Fetch Error" });
    }
});

module.exports = router;
