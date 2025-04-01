import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toast CSS
import "./signUp.css"; // Import the CSS file

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate(); // Hook for navigation

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setErrorMessage("Please fill in all fields!");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch("http://localhost:5050/api/sign-up", { // Ensure correct API endpoint
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role: "buyer" // Include role as per backend
                })
            });

            const data = await response.json();

            if (data.success) {
                toast.success("Sign Up Successful!", { position: "top-right", autoClose: 2000 });

                // Redirect after showing toast
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                setErrorMessage(data.message);
                toast.error(data.message, { position: "top-right", autoClose: 3000 });
            }
        } catch (error) {
            toast.error("Error: Could not sign up.", { position: "top-right", autoClose: 3000 });
            setErrorMessage("Error: Could not sign up.");
        }
    };

    return (
        <div className="signup-container">
            <ToastContainer /> {/* Toast container for displaying toasts */}
            <div className="signup-card">
                <h2 className="signup-heading">Sign Up</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="input-container">
                        <label className="input-label">Full Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            className="input-field"
                            placeholder="Enter your full name" 
                            required
                        />
                    </div>
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
                    <div className="input-container">
                        <label className="input-label">Confirm Password</label>
                        <div className="password-container">
                            <input 
                                type="password" 
                                name="confirmPassword" 
                                value={formData.confirmPassword} 
                                onChange={handleChange} 
                                className="input-field"
                                placeholder="Confirm your password" 
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className="signup-button">Sign Up</button>
                    <p className="signin-text">
                        Already have an account? <Link to="/login" className="signin-link">Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
