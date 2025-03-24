const User = require("../models/User");
const bcrypt = require("bcryptjs");

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        
        if (!email) throw new Error("Please provide an email");
        if (!password) throw new Error("Please provide a password");

   
        const user = await User.findOne({ email });
        if (!user) throw new Error("Invalid password or email");

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid password or email");

        res.status(200).json({
            message: "Login successful",
            success: true,
            error: false
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
