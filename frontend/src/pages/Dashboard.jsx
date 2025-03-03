import { useEffect, useState } from "react";
import { getAIInsights } from "../api/ai";
import { Card, CardContent } from "../components/ui/Card";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Bell, Home, TrendingUp, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [insights, setInsights] = useState(null);
    const [showForm, setShowForm] = useState(false);
    // const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "son" });
    const [transactions, setTransactions] = useState([]);
    const [message, setMessage] = useState("");
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
    }, []);


    

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Family Finance</h1>
                <div className="flex items-center space-x-4">
                    <Home className="w-6 h-6" />
                    <TrendingUp className="w-6 h-6" />
                    <Wallet className="w-6 h-6" />
                    <Link to="/alerts" className="relative">
                        <Bell className="w-6 h-6 text-yellow-400" />
                    </Link>
                </div>
            </nav> */}
            <h2 className="text-2xl font-bold mt-4">Dashboard</h2>
            
            {/* <button onClick={() => setShowForm(!showForm)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                Add Member
            </button>

            {showForm && (
                <form onSubmit={handleSubmit} className="mt-4 p-4 bg-white shadow rounded">
                    <input type="text" name="name" placeholder="Name" onChange={handleChange} required className="border p-2 w-full mb-2" />
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="border p-2 w-full mb-2" />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="border p-2 w-full mb-2" />
                    
                    <select name="role" onChange={handleChange} required className="border p-2 w-full mb-2">
                        <option value="son">Son</option>
                        <option value="daughter">Daughter</option>
                        <option value="mother">Mother</option>
                        <option value="brother">Brother</option>
                        <option value="sister">Sister</option>
                        <option value="accountant">Accountant</option>
                    </select>

                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Create Member</button>
                </form>
            )} */}

            {message && <p className="mt-2 text-green-600">{message}</p>}

            <div className="grid grid-cols-3 gap-4 mb-6 mt-6">
                <Card><CardContent><p>Bank Balance</p><h2>$124,500.00</h2></CardContent></Card>
                <Card><CardContent><p>Investments</p><h2>$89,230.50</h2></CardContent></Card>
                <Card><CardContent><p>Property Value</p><h2>$450,000.00</h2></CardContent></Card>
            </div>

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

            <div className="bg-white p-4 rounded-lg shadow-md mt-6">
                <h3 className="text-lg font-semibold">AI Financial Insights</h3>
                {insights ? <p className="text-gray-800">{insights}</p> : <p className="text-gray-500">Loading insights...</p>}
            </div>
        </div>
    );
};

export default Dashboard;