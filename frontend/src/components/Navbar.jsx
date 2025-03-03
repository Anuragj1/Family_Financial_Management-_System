import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Family Finance</h1>
            <div>
                <Link to="/dashboard" className="px-4 py-2 bg-blue-600 rounded-lg mr-2">Dashboard</Link>
                <Link to="/insights" className="px-4 py-2 bg-purple-600 rounded-lg mr-2">AI Insights</Link>
                <button onClick={handleLogout} className="px-4 py-2 bg-red-600 rounded-lg">Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;
