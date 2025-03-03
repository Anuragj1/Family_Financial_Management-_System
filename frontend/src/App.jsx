import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Insights from "./pages/Insights";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Register />} /> 
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/insights" element={<Insights />} />

            </Routes>
        </Router>
    );
}

export default App;
