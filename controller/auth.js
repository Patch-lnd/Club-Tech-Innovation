const mysql = require("mysql");
// Getting the jasonwebtoken module
const jwt = require("jsonwebtoken")
// Getting the encryption mudule for ourt passwords
const bcypt = require("bcryptjs");

//Database Initialization
const db = mysql.createConnection({
    host: process.env.db_host,
    user: process.env.db_user, 
    password: process.env.db_password,
    database:process.env.DataBase
});

exports.connexion = async(req, res) => {
    /* const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const passwordConfim = req.body.passwordConfim
     */

    // Using destructuring syntax
    const {name, email, password, passwordConfirm} = req.body

    // Making the system to allow an email to be registered just Once
    db.query('SELECT email FROM users WHERE email = ?', [email], async(error, result) => {
        if (error) {
            console.log(error)
        }
        // "result" commes out as an array, so we wanna check how many came out
        //If >0 it means it's already an email with value on our db
        if (result.length > 0) {
            
            return res.render('connexion' ,{
                message: "email already registered"
            })
        }else if (password !== passwordConfirm) {
             
            return res.render('connexion' ,{
                message: "Passwords do not match"
            })
        }

        // We "await" since the encryption can take liitle longet than the normal 
        // Form execution time. We then add "async" at the beginning of our function db.query
        // Our "password" is hashed 8 times which is the standard for a good hashing 
        let hashedPassword = await bcrypt.hash(password, 8)
        console.log(hashedPassword)

    })

}