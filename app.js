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

app.get("/",(req,res)=>{
    res.render("index");
    // res.send("I love Basketball") RESPOND SENT INTO THE BROWNSER
})
app.get("/connexion",(req,res)=>{
    res.render("connexion");
    // res.send("I love Basketball") RESPOND SENT INTO THE BROWNSER
})
app.get("/compte",(req,res)=>{
    res.render("compte");
    // res.send("I love Basketball") RESPOND SENT INTO THE BROWNSER
})
app.use((req,res)=>{
    res.status(404).render("error");
    // res.send("I love Basketball") RESPOND SENT INTO THE BROWNSER
})

app.listen(3001, () => {
    console.log("Server started on port 3001")
})