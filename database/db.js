const mysql = require("mysql");


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
});

module.exports = db; 