const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) throw new Error("Please provide an email");
        if (!password) throw new Error("Please provide a password");

        
        const user = await User.findOne({ email });
        if (!user) throw new Error("Invalid password or email");

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid password or email");

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SCRECAT_KEY,
            { expiresIn: "1h" }
        );

        // Set token in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
        });

        res.status(200).json({
            message: "Login successful",
            success: true,
            error: false,
            token,
            user: { id: user._id, name: user.name, role: user.role }
        });

    } catch (error) {
        res.status(400).json({
            message: error.message || "Server error",
            success: false,
            error: true
        });
    }
};

module.exports = loginController;
