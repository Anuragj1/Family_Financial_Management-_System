const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const punycode = require("punycode/"); 


dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Database Connection
connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/protected", require("./routes/privateRoutes"));
app.use("/api/assets", require("./routes/assetRoutes")); 
app.use("/api/ai", require("./routes/aiRoutes")); 
app.use("/api/transactions", require("./routes/transactionRoutes"));



app.get("/", (req, res) => {
    res.send("Backend Server Running Successfully!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
