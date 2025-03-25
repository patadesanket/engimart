const express = require("express");
const authMiddleware = require("../middleware/authTokan");

const router = express.Router();

router.get("/protected", authMiddleware, (req, res) => {
    res.json({ message: "You have access!", user: req.user });
});

module.exports = router;
