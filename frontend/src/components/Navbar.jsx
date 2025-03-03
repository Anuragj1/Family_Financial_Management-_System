import { Link, useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Family Finance</h1>
            <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="px-4 py-2 bg-blue-600 rounded-lg">Dashboard</Link>
                <Link to="/insights" className="px-4 py-2 bg-purple-600 rounded-lg">AI Insights</Link>
                <Link to="/alerts" className="relative">
                    <Bell className="w-6 h-6 text-yellow-400" />
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">!</span>
                </Link>
                <button onClick={handleLogout} className="px-4 py-2 bg-red-600 rounded-lg">Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;
