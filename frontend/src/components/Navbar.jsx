import { Link, useNavigate } from "react-router-dom";
import { Bell, UserPlus } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "son" });
    const [message, setMessage] = useState("");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(""); // Reset previous messages
    
        const res = await fetch("http://localhost:5000/api/users/add-member", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(formData),
        });
    
        const data = await res.json();
        setMessage(data.msg);
    
        if (res.ok) {
            setShowForm(false);
            alert("✅ Member added successfully!");
        }
    };
    
    return (
        <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Family Finance</h1>
            <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="px-4 py-2 bg-blue-600 rounded-lg">Dashboard</Link>
                <Link to="/insights" className="px-4 py-2 bg-purple-600 rounded-lg">AI Insights</Link>
                <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-green-600 rounded-lg flex items-center">
                    <UserPlus className="w-5 h-5 mr-2" /> Add Member
                </button>
                <Link to="/alerts" className="relative">
                    <Bell className="w-6 h-6 text-yellow-400" />
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">!</span>
                </Link>
                <button onClick={handleLogout} className="px-4 py-2 bg-red-600 rounded-lg">Logout</button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="absolute top-16 right-10 bg-white text-black p-4 shadow-md rounded-lg w-72">
                    <h2 className="text-lg font-bold mb-2">Add Member</h2>
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
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">Create Member</button>
                </form>
            )}
        </nav>
    );
};

export default Navbar;