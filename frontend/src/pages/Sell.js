import React , { useEffect}from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCar, FaHome, FaMobileAlt, FaBriefcase, FaBicycle, FaTv, FaTruck } from "react-icons/fa";
import "./sell.css"; 



const Sell = () => {
    const navigate = useNavigate();

     useEffect(() => {
        const token = localStorage.getItem("token"); // 🔹 Check if token exists

        if (!token) {
            navigate("/login"); // 🔹 Redirect to login if user is not logged in
        }
    }, [navigate]); // 🔹 Runs once on component mount



    const categories = [
        { name: "Cars", icon: <FaCar /> },
        { name: "Properties", icon: <FaHome /> },
        { name: "Mobiles", icon: <FaMobileAlt /> },
        { name: "Jobs", icon: <FaBriefcase /> },
        { name: "Bikes", icon: <FaBicycle /> },
        { name: "Electronics & Appliances", icon: <FaTv /> },
        { name: "Commercial Vehicles & Spares", icon: <FaTruck /> },
    ];


    return (
        <div className="sell-container">
            <div className="sell-header">
                <FaArrowLeft className="back-icon" onClick={() => navigate(-1)} />
            </div>
            <h2 className="sell-title">POST YOUR AD</h2>
            <div className="category-list">
                {categories.map((category, index) => (
                    <div key={index} className="category-item">
                        <span className="category-icon">{category.icon}</span>
                        <span className="category-name">{category.name}</span>
                        <span className="category-arrow">&gt;</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sell;
