import { useState, useEffect } from "react";

const Alerts = () => {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/transactions/alerts", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });

                const data = await res.json();
                setAlerts(data);
            } catch (error) {
                console.error("Error fetching alerts:", error);
            }
        };

        fetchAlerts();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold">Transaction Alerts</h2>

            {alerts.length > 0 ? (
                <div className="mt-4 bg-yellow-100 p-4 rounded">
                    {alerts.map((alert, index) => (
                        <p key={index} className="text-red-600">{alert.message}</p>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 mt-4">No alerts found</p>
            )}
        </div>
    );
};

export default Alerts;
