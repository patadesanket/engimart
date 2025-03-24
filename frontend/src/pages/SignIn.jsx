import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toast CSS
import "./signIn.css"; // Import the CSS file

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate(); // Hook for navigation

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setErrorMessage("Please enter both email and password!");
            return;
        }

        try {
            const response = await fetch("http://localhost:5050/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                toast.success("Login Successful!", { position: "top-right", autoClose: 2000 });

                // Redirect after showing toast
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } else {
                setErrorMessage(data.message);
                toast.error(data.message, { position: "top-right", autoClose: 3000 });
            }
        } catch (error) {
            toast.error("Error: Could not log in.", { position: "top-right", autoClose: 3000 });
            setErrorMessage("Error: Could not log in.");
        }
    };

    return (
        <div className="signin-container">
            <ToastContainer /> {/* Toast container for displaying toasts */}
            <div className="signin-card">
                <h2 className="signin-heading">Login</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="input-container">
                        <label className="input-label">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            className="input-field"
                            placeholder="Enter your email" 
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label className="input-label">Password</label>
                        <div className="password-container">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                name="password" 
                                value={formData.password} 
                                onChange={handleChange} 
                                className="input-field"
                                placeholder="Enter your password" 
                                required
                            />
                            <span 
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>
                    <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
                    <button type="submit" className="signin-button">Sign In</button>
                    <p className="signup-text">
                        Don't have an account? <Link to="/sign-up" className="signup-link">Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
