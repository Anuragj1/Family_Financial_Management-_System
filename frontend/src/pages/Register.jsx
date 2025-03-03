import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "family_member"
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData);
            alert("Registration successful!");
            navigate("/login");
        } catch (error) {
            alert("Registration failed!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="name" placeholder="Name" onChange={handleChange} required 
                        className="w-full p-2 border rounded-lg" />
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required 
                        className="w-full p-2 border rounded-lg" />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required 
                        className="w-full p-2 border rounded-lg" />

                    {/* Role Dropdown */}
                    <select name="role" onChange={handleChange} required className="w-full p-2 border rounded-lg">
                        <option value="family_member">Family Member</option>
                        <option value="admin">Admin</option>
                        <option value="accountant">Accountant</option>
                    </select>

                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">Register</button>
                </form>

                {/* Redirect to Login */}
                <p className="text-center mt-4 text-gray-600">
                    Already have an account? <Link to="/login" className="text-blue-600 font-semibold">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
