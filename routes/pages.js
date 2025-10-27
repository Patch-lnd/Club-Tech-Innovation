const express = require("express");
const authRoutes = require("./auth")

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
router.get('/connexion', (req, res) => {
  res.render('connexion', { message: null, success: null }); // ensure message is always defined
});
// This GET route serves the login form
router.get('/login', (req, res) => {
  res.render('login', { message: null, success: null }); // ensure message is always defined
});

//router.use('/auth', authRoutes)
/* router.use((req,res)=>{
    res.status(404).render("error");
});
 */
module.exports = router;