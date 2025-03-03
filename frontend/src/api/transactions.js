import axios from "axios";

const API_URL = "http://localhost:5000/api/transactions";

// ✅ Fetch Suspicious Transactions Alerts
export const getTransactionAlerts = async (token) => {
    try {
        const res = await axios.get(`${API_URL}/alerts`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        return [];
    }
};
