const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    // Token Header Se Lo
    const token = req.header("Authorization");
    
    if (!token) {
        return res.status(401).json({ msg: "Access Denied! No token provided." });
    }

    try {
        // Token me "Bearer " remove karne ke liye split() use kar rahe hain
        const tokenValue = token.split(" ")[1]; 
        
        // JWT Token Verify Karo
        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
        req.user = decoded; // User data request me store kar lo
        
        next(); // Next middleware ya controller ko call karo
    } catch (err) {
        res.status(400).json({ msg: "Invalid Token!" });
    }
};
