import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios"; 
import "react-toastify/dist/ReactToastify.css";
import "./signIn.css";

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    // Prevent access to login page if already logged in
    useEffect(() => {
        try {
            const token = localStorage.getItem("token");



            if (token) {
                navigate("/"); 
            }
        } catch (error) {
            console.error("Error checking login status:", error);
        }
    }, [navigate]);

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
            const response = await axios.post("http://localhost:5050/api/login", formData);

            console.log("API Response:", response.data);

            console.log("User object from response:", response.data.user);
            console.log("User Name from response:", response.data.user?.name);


            if (response.data.success) {
                toast.success("Login Successful!", { position: "top-right", autoClose: 2000 });



                // ✅ Store user details
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userId", response.data.user.id); 
                localStorage.setItem("user", JSON.stringify(response.data.user));
                localStorage.setItem("userName", response.data.user.name);


                const savedUserName = localStorage.getItem("userName");
                console.log("Saved userName in localStorage:", savedUserName);

                console.log("Stored User ID:", response.data.user.id);
                console.log("Stored Token:", response.data.token);

                // Redirect to dashboard
                setTimeout(() => {
                    navigate("/", { replace: true }); 
                    window.history.pushState(null, "", "/");
                }, 2000);
            } else {
                setErrorMessage(response.data.message);
                toast.error(response.data.message, { position: "top-right", autoClose: 3000 });
            }
        } catch (error) {
            toast.error("Error: Could not log in.", { position: "top-right", autoClose: 3000 });
            setErrorMessage("Error: Could not log in.");
        }
    };

    return (
        <div className="signin-container">
            <ToastContainer />
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
