const express = require("express");
const authRoutes = require("./auth")
const {protect} = require("../middleware/authMiddleware");
const redirectIfAuthentificated = require("../middleware/redirectIfAuthenticated"); // Importing the middleware

const router = express.Router();

router.get("/",(req,res)=>{
    res.render("index");
    // res.send("I love Basketball") RESPOND SENT INTO THE BROWNSER
});
router.get("/compte",(req,res)=>{
    res.render("compte");
    // res.send("I love Basketball") RESPOND SENT INTO THE BROWNSER
});
router.get("/projects",(req,res)=>{
    res.render("projects");
    // res.send("I love Basketball") RESPOND SENT INTO THE BROWNSER
});
router.get("/blog",(req,res)=>{
    res.render("blog");
    // res.send("I love Basketball") RESPOND SENT INTO THE BROWNSER
});
router.get("/apropos",(req,res)=>{
    res.render("apropos");
    // res.send("I love Basketball") RESPOND SENT INTO THE BROWNSER
});
// This GET route serves the signup form
router.get('/connexion', redirectIfAuthentificated, (req, res) => {
  res.render('connexion', { message: null, success: null }); // ensure message is always defined
});
// This GET route serves the login form
router.get('/login', redirectIfAuthentificated, (req, res) => {
  res.render('login', { message: null, success: null }); // ensure message is always defined
});
// Route to get to the dashboard after login 
router.get('/dashboard', protect, (req, res)=>{
    res.render("dashboard")
});

/* router.get('/dashboard', authMiddleware, userColtroller.dashboard); */
module.exports = router;