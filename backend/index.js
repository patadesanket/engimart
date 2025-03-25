const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/dbconfig");
const authRoutes = require("./routes/authRoutes")
const protectedRoutes = require("./routes/protectedRoutes")
const cookieParser = require("cookie-parser")


dotenv.config();

const app = express();


app.use(express.json());
app.use(cors());
app.use(cookieParser())




app.use("/api", authRoutes)
app.use("/api" , protectedRoutes )

const PORT = process.env.PORT || 5050;


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error("Database connection failed:", err);
});
