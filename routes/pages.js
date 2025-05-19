const express = require("express");

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
router.get("/connexion",(req,res)=>{
    res.render("connexion");
    // res.send("I love Basketball") RESPOND SENT INTO THE BROWNSER
});
/* router.use((req,res)=>{
    res.status(404).render("error");
});
 */
module.exports = router;