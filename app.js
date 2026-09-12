const express = require("express");
const app = express();
// Importing the path node module to give directories for files running in a later on code
const path = require("path");
// Security process module
const dotenv = require("dotenv");
// Giving the path where the dotenv file will be strored for configs inside
dotenv.config({path: './configs.env'});

const db = require("./database/db");
const authController = require("./controller/auth");   

const stratPendingUserCleanup = require("./middleware/pendingUserCleanup");

// If behing a proxy server (like when deploying on Cloudfalre, Nginx, Heroku), trust the first proxy
app.set('trust proxy', 1); // 1 Means trust first proxy


// Variable leading to the path where all the Frontend, JS will be strored 
// __dirname is a global variable that gives the current path 
const PublicDirectory = path.join(__dirname, './public');

// Tu use CSS, JS. Need to make sure that Express(the server)
// is actualy using the correct folders shwed by variable "PublicDirectory"
app.use(express.static(PublicDirectory))

// Defining Cookie Parser to read cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const attachUser = require("./middleware/attachUser");

// Attaching the user's info like avatar to res.locals for ALL views
app.use(attachUser);

// Auth Middleware (Must Be Before The Routes)
const authMiddleware = require("./middleware/authMiddleware");


/* //Database Initialization
const db = mysql.createConnection({
    host: process.env.db_host,
    user: process.env.db_user, 
    password: process.env.db_password,
    database:process.env.DataBase
});

// Connect my database to app 
// Test to see the db loading status, success or error
db.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("MYSQL Connected");
    }
}) */

// Start automatic cleanup of expired pending users
stratPendingUserCleanup(db);

// Sets "EJS" view engine for my app
app.set("view engine", "ejs");
    
// Ensures that the values we are grabbing from the form comes as JSON
app.use(express.json())
// Makes sure I can take data from any form
app.use(express.urlencoded({extended: true}))

app.use((req, res, next) => {
  // S'assure que user existe toujours dans toutes les vues
  if (!res.locals.user) res.locals.user = null;
  next();
});

// Page pour entrer le code OTP 
app.get("/otp", (req, res)=>{
    const{ userId, message} = req.query; // On peut passer l'ID utilisateur via query 
    res.render("otp", {userId, message}); // Rendre la page OTP avec l'ID utilisateur et le message 
})

app.post("/verify-otp", authController.verifyOTP);
// Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require("./routes/auth"))
 app.use((req,res)=>{
    res.status(404).render("error");
});

app.listen(3001, () => {
    console.log("Server started on port 3001");
});

