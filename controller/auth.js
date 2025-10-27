const mysql = require("mysql");
// Getting the jasonwebtoken module
const jwt = require("jsonwebtoken")
// Getting the encryption mudule for ourt passwords
const bcrypt = require("bcryptjs");

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

    if (password.length < 6) {
        return res.render('connexion', {
        message: "Le mot de passe doit contenir au moins 6 caractères",
        success: null
    })
    }
    // Making the system to allow an email to be registered just Once
    db.query('SELECT email, name FROM users WHERE email = ? OR name = ?', [email, name], async(error, result) => {
        if (error) {
            console.log(error)
            return res.render('connexion', {
                message: "An error occurred while checking the database.",
                success: null
            });
        }
        // "result" commes out as an array, so we wanna check how many came out
        //If >0 it means it's already an email with value on our db
        // "result" will contain only the email and name columns, making the query more efficient
        if (result.length > 0) {
            // Check if the email is the cause of the conflict
            if (result[0].email === email) {
                return res.render('connexion', {
                    message: "Email déjà existant",
                    success: null
                });
            }
            
            // Check if the name is the cause of the conflict
            if (result[0].name === name) {
                return res.render('connexion', {
                    message: "Nom déjà existant",
                    success: null
                });
            }
        }else if (password !== passwordConfirm) {
             
            return res.render('connexion' ,{
                message: "Mot de passe différent",
                success: null
            })
        }

        // We "await" since the encryption can take little longet than the normal 
        // Form execution time. We then add "async" at the beginning of our function db.query
        // Our "password" is hashed 8 times which is the standard for a good hashing 
        let hashedPassword = await bcrypt.hash(password, 8)
        console.log(hashedPassword)
        console.log(password)
        db.query("INSERT INTO users SET ?", {name: name, email: email, password: hashedPassword}, (error, result) =>{
            if (error) {
                console.log(error)
            }else{
                console.log(result)
                return res.render('connexion' ,{
                    success: "Compte Crée avec Success",
                    message: null
                }) 
            }
        })
    })

}

// LOGIN Controller 
exports.login = async(req, res)=> {
    try{
        const {identifier, password} = req.body; 

        // Step 1 Check all fields are filled 
        if (!identifier || !password){
            return res.render("login", {
            message: "Veuillez remplir tous les champs",
            success: null
        }) 
    }   // STEP 2 Search for user by email OR name 

    const query = 'SELECT * FROM users WHERE email = ? OR name = ? LIMIT 1';
    db.query(query, [identifier, identifier], async(error, results) => {
        if (error) {
            console.log(error);
            return res.render('login', {
                message: "Erreue de Base de Donnée.",
                success: null
            });
        }
        if (results.length === 0) {
            return res.render('login', {
                message: "Email ou Nom Incorrect",
                success: null
            });
        }
         const user = results[0];

         // Step 3: Compare Passwords
         const isMatch = await bcrypt.compare(password, user.password);
         if (!isMatch) {
            return res.render('login', {
                message: "Mot de passe Incorrecte",
                success: null
            });
         }

         // Step 4: Create JWT Token
         const token = jwt.sign(
            {id: user.id, role: user.role},
            process.env.JWT_SECRET || "defaultSecretKey",
            {expiresIn: "2h"}
         )

         // Step 5: Store in cookie 
         res.cookie("token", token, {
            httpOnly: true, 
            secure: false, // Set true if HTTPS 
            maxAge: 2 * 60 * 60 * 1000 // 2 hours
         });

         // STEP 6: Redirect or render success 
         return res.redirect("/dashboard"); // Redirect to dashboard or desired page
    });
    } catch (err) {
        console.log(err);
        return res.render('login', {
            message: "Une erreur est survenue lors de la connexion.",
            success: null
        });
    }      
}









/* 
exports.login = async(req, res) => {
    const {name, password} = req.body
    db.query('SELECT email, name FROM users WHERE email = ? OR name = ?', [email, name], async(error, result) => {
  
        if (result.length === 0) {
            return res.render('connexion' ,{
                success: null,
                message: "Email ou Nom Incorrect"
            }) 
        }
  
        const isMatch = await bcrypt.compare(password, db.password)
        if (!isMatch) {
            return res.render('connexion' ,{
                success: null,
                message: "Mot de passe Incorrecte"
            }) 
        }
        const token = jwt.sing(
            {id: db.id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: "2h"}
        )
        res.status(200).json({token})
    })

} */