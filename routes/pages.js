const express = require("express");
const authRoutes = require("./auth")
const {protect} = require("../middleware/authMiddleware");
const {redirectIfAuthenticated} = require("../middleware/redirectIfAuthenticated"); // Importing the middleware to redirect users to dashboard if the are connected and try to go to login or register
const dashboardController = require("../controller/dashboardController");
const permissionsMiddleware = require("../middleware/attachPermissions")
const upload = require("../middleware/fileUploader"); // Importing the file uploader middleware
const profileController = require("../controller/profileController"); // Importing the profile controller to handle profile edits

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
router.get('/connexion', redirectIfAuthenticated, (req, res) => {
  res.render('connexion', { message: null, success: null }); // ensure message is always defined
});
// This GET route serves the login form
router.get('/login', redirectIfAuthenticated, (req, res) => {
  res.render('login', { message: null, success: null }); // ensure message is always defined
});
// Route to get to the dashboard after login 
router.get('/dashboard', protect, permissionsMiddleware, dashboardController.dashboard);
// When a useer accesses dashboard page, we first protect the route to ensure only authenticated users can access it.
//  Then, we attach the permissions based on their role using the permissionsMiddleware.
//  Finally, we call the dashboardController to render the dashboard view with the user data and their permissions.

/* router.get('/dashboard', protect, permissionsMiddleware, dashboardController.dashboard,(req, res)=>{
    // Defining the user's attributes for my dashboard view which depends on the users' role
    res.render("dashboard", {user: req.user})
}); */

router.get('/logout', (req, res)=>{
    res.clearCookie("token");
    res.redirect("/login");
});

// Formulaire pour éditer le profil 
router.get("/profile/edit", protect, (req, res)=>{
    res.render("profile/edit", {
        user: req.user,
           error: null,   // on initialise pour que EJS puisse utiliser
        success: null    // idem pour success
    });
});


// POST pour enregistrer les modifications + uplaod photo 
router.post("/profile/edit", protect, upload.single("avatar"), profileController.editProfile);

// GET route for the change-password page
router.get("/profile/password", protect, (req, res) => {
    res.render("profile/password", {
        user: req.user,
        error: null,
        success: null
    });
});

// POST route for changing the user's password
router.post("/profile/password", protect, profileController.changePassword);

module.exports = router;