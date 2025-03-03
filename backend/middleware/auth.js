const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("Authorization");
    console.log("🔍 Received Token:", token);

    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied!" });
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        console.log("✅ Decoded Token:", decoded);
        req.user = decoded;
        next();
    } catch (err) {
        console.error("❌ Invalid Token Error:", err.message);
        res.status(401).json({ msg: "Invalid Token!" });
    }
};

