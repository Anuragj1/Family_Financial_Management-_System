import { useEffect, useState } from "react";
import { getAIInsights } from "../api/ai";
import { Search } from "lucide-react";

const Insights = () => {
    const [insights, setInsights] = useState(null);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");
    const token = localStorage.getItem("token");

    const fetchInsights = async (customQuery = "") => {
        setLoading(true);
        try {
            const res = await getAIInsights(token, customQuery);
            setInsights(res.insights);
        } catch (error) {
            console.error("Error fetching AI insights", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchInsights();
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">💡 AI Financial Insights</h2>

            {/* ✅ AI Response Box */}
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl text-center min-h-[180px]">
                {loading ? (
                    <p className="text-gray-600 animate-pulse">Fetching insights...</p>
                ) : insights ? (
                    <p className="text-lg text-gray-800 font-medium leading-relaxed">{insights}</p>
                ) : (
                    <p className="text-gray-500">No insights available yet. Ask AI for help!</p>
                )}
            </div>

            {/* ✅ AI Query Input Box */}
            <div className="mt-6 flex w-full max-w-2xl relative">
                <input
                    type="text"
                    placeholder="Ask AI about your financial health..."
                    className="w-full p-3 border rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 outline-none text-gray-800"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && fetchInsights(query)}
                />
                <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full shadow-md hover:scale-105 transition-transform"
                    onClick={() => fetchInsights(query)}
                >
                    <Search className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default Insights;
