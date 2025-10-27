const express = require("express")
// We need to creat our own module for the user Authentification
const authController = require("../controller/auth")

const router = express.Router();
//router post, we are using the method post and not get because we are sending data 
//From our form and not jsut loading it on our page
router.post("/connexion", authController.connexion);

// Login Route
router.post("/login", authController.login);


module.exports = router;