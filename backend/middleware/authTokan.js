const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
   
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {

        console.log("Received Token:", token); 

        const decoded = jwt.verify(token, process.env.JWT_SCRECAT_KEY);

        console.log("Decoded Token:", decoded);

        req.user = decoded; 
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
