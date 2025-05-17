const express = require("express");
const mysql = require("mysql");
const app = express();
// Security process module
const dotenv = require("dotenv");
// Giving the path where the dotenv file will be strored for configs inside
dotenv.config({path: './configs.env'});

//Database Initialization
const db = mysql.createConnection({
    host: process.env.db_host,
    user: process.env.db_user, 
    password: process.env.db_password,
    database:process.env.DataBase
});

//

db.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("MYSQL Connected");
    }
})

app.get("/",(req,res)=>{
    res.send("I love Basketball")
})
app.listen(3001, () => {
    console.log("Server started on port 3001")
})
//layer-hSi3MaNVsahL6LQwsqPFNX