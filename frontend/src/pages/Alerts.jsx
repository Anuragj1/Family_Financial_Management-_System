import { useEffect, useState } from "react";
import { getTransactionAlerts } from "../api/transactions";
import { AlertCircle } from "lucide-react";

const Alerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchAlerts = async () => {
            setLoading(true);
            try {dgdfdgdfdf
                const res = await getTransactionAlerts(token);
                setAlerts(res);
            } catch (error) {
                console.error("Error fetching alerts", error);
            }
            setLoading(false);
        };

        fetchAlerts();
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
            <h2 className="text-3xl font-bold mb-4">🚨 Suspicious Transactions</h2>

            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
                {loading ? (
                    <p className="text-gray-600">Checking for alerts...</p>
                ) : alerts.length > 0 ? (
                    <ul className="space-y-4">
                        {alerts.map((alert, index) => (
                            <li key={index} className="flex items-center p-4 bg-red-100 border-l-4 border-red-600 rounded-md">
                                <AlertCircle className="text-red-600 w-6 h-6 mr-3" />
                                <p className="text-gray-800">{alert.message}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No suspicious transactions found.</p>
                )}
            </div>
        </div>
    );
};

export default Alerts;