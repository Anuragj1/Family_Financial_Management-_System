import axios from "axios";

const API_URL = "http://localhost:5000/api/ai";

// ✅ Query ko backend me pass karo
export const getAIInsights = async (token, query = "Provide financial insights") => {
    try {
        const res = await axios.post(`${API_URL}/insights`, { query }, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        return { insights: "Error fetching insights." };
    }
};
