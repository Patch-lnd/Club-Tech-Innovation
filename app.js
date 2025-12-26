const express = require("express");
const mysql = require("mysql");
const app = express();
// Importing the path node module to give directories for files running in a later on code
const path = require("path");
// Security process module
const dotenv = require("dotenv");
// Giving the path where the dotenv file will be strored for configs inside
dotenv.config({path: './configs.env'});

// Variable leading to the path where all the Frontend, JS will be strored 
// __dirname is a global variable that gives the current path 
const PublicDirectory = path.join(__dirname, './public');

// Tu use CSS, JS. Need to make sure that Express(the server)
// is actualy using the correct folders shwed by variable "PublicDirectory"
app.use(express.static(PublicDirectory))

// Defining Cookie Parser to read cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//Database Initialization
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
})

// Sets "EJS" view engine for my app
app.set("view engine", "ejs");
    
// Ensures that the values we are grabbing from the form comes as JSON
app.use(express.json())
// Makes sure I can take data from any form
app.use(express.urlencoded({extended: true}))


// Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require("./routes/auth"))
 app.use((req,res)=>{
    res.status(404).render("error");
});

app.listen(3001, () => {
    console.log("Server started on port 3001");
});