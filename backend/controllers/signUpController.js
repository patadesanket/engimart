const User = require("../models/User")
const bcrypt = require("bcryptjs")

const signUpController = async(req,res) => {
    try{
         const { name , email , password , role } = req.body;
         if(!name){
            throw new Error("Please provide a name")
         }
         if (!email) {
            throw new Error("Please provide an email");
        }
        if (!password) {
            throw new Error("Please provide a password");
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            success: true,
            error: false
        });
    }
    catch(err){
        res.status(400).json({
            message : err.message || err,
            success : false,
            error : true
        })
    }
}

module.exports = signUpController;