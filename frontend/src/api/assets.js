import axios from "axios";

const API_URL = "http://localhost:5000/api/assets";

// ✅ Fetch All Assets
export const getAssets = async (token) => {
    const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

// ✅ Add New Asset
export const addAsset = async (assetData, token) => {
    const res = await axios.post(API_URL, assetData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};
