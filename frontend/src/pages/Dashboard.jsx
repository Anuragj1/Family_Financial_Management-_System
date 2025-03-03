import { useEffect, useState } from "react";
import { getAIInsights } from "../api/ai";
import { getTransactionAlerts } from "../api/transactions";
import { Card, CardContent } from "../components/ui/Card";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Bell, Home, TrendingUp, Wallet } from "lucide-react";
import PlaidLinkButton from "../components/PlaidLinkButton";

const Dashboard = () => {
    const [insights, setInsights] = useState(null);
    const [alerts, setAlerts] = useState([]);
    const [publicToken, setPublicToken] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                const res = await getAIInsights(token);
                setInsights(res.insights);
            } catch (error) {
                console.error("Error fetching AI insights", error);
            }
        };
        fetchInsights();

        const fetchAlerts = async () => {
            const data = await getTransactionAlerts(token);
            setAlerts(data);
        };
        fetchAlerts();
    }, []);

    const handleSuccess = async (token) => {
        setPublicToken(token);
        console.log("🔹 Sending Public Token to Backend...");

        const res = await fetch("http://localhost:5000/api/plaid/exchange-public-token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ public_token: token }),
        });

        const data = await res.json();
        console.log("✅ Exchange Response:", data);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Family Finance</h1>
                <div className="flex items-center space-x-4">
                    <Home className="w-6 h-6" />
                    <TrendingUp className="w-6 h-6" />
                    <Wallet className="w-6 h-6" />
                    <div className="relative">
                        <Bell className="w-6 h-6 text-yellow-400" />
                        {alerts.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                                {alerts.length}
                            </span>
                        )}
                    </div>
                </div>
            </nav>
            <h2 className="text-2xl font-bold mt-4">Dashboard</h2>
            <PlaidLinkButton onSuccess={handleSuccess} />
            {publicToken && <p className="text-green-600 mt-4">Public Token: {publicToken}</p>}
            
            {/* ✅ Financial Summary Cards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <Card><CardContent><p>Bank Balance</p><h2>$124,500.00</h2></CardContent></Card>
                <Card><CardContent><p>Investments</p><h2>$89,230.50</h2></CardContent></Card>
                <Card><CardContent><p>Property Value</p><h2>$450,000.00</h2></CardContent></Card>
            </div>

            {/* ✅ Expense Breakdown Charts */}
            <div className="grid grid-cols-2 gap-4">
                <Card>
                    <CardContent>
                        <h3 className="text-lg font-semibold mb-4">Monthly Spending by Category</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie data={[{ name: "Food", value: 400 }, { name: "Transport", value: 300 }]} dataKey="value" cx="50%" cy="50%" outerRadius={80}>
                                    <Cell fill="#0088FE" /><Cell fill="#00C49F" />
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <h3 className="text-lg font-semibold mb-4">Spending Trends</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={[{ name: "Jan", amount: 200 }, { name: "Feb", amount: 500 }]}>
                                <XAxis dataKey="name" /><YAxis /><Tooltip />
                                <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* ✅ AI Insights Section */}
            <div className="bg-white p-4 rounded-lg shadow-md mt-6">
                <h3 className="text-lg font-semibold">AI Financial Insights</h3>
                {insights ? <p className="text-gray-800">{insights}</p> : <p className="text-gray-500">Loading insights...</p>}
            </div>
        </div>
    );
};

export default Dashboard;
