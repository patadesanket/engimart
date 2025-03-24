const express = require("express")
const signUpController = require("../controllers/signUpController")
const loginController = require("../controllers/loginController")


const router = express.Router()

router.post("/sign-up", signUpController)

router.post("/login" , loginController)


module.exports = router