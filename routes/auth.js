const express = require("express")
// We need to creat our own module for the user Authentification
const auth = require("../control/auth")

const router = express.Router();
//router post, we are useing the method poqt and not get because we are sending data 
//From our form and not jsut loading it on our page
router.post("/connexion", auth.connexion);


module.exports = router;