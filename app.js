const express = require("express");
const mysql = require("mysql");
const app = express();
const db = mysql.createConnection({
    host:'localhost',
    user: 'root', 
    password:'',
    database:'ti-login'
});

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