const mysql = require("mysql");
// Getting the jasonwebtoken module
const jwt = require("jsonwebtoken")
// Getting the encryption mudule for ourt passwords
const bcrypt = require("bcryptjs");

const {generateOTP} = require("../middleware/otp");
// generates Mailer module to send OTP to users
const {sendOTP} = require("../middleware/mailer");
// Sends the mails to users


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

         // STEP 4: OTP ACTIVATION 
         createAndSendOTP(user); // Génère OTP et l'envoie par email
        res.redirect(`/otp?userId=${user.id}&message=Un code a été envoyé sur votre email`);
        //  return res.redirect("/dashboard"); // Redirect to dashboard or desired page
    });
    } catch (err) {
        console.log(err);
        return res.render('login', {
            message: "Une erreur est survenue lors de la connexion.",
            success: null
        });
    }      
}


 function createAndSendOTP(user){
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

    // Store OTP in database
     db.query(
        "INSERT INTO otp_codes(user_id, code, expires_at) VALUES(?,?,?)",
        [user.id, otp, expiresAt],
        async(err, result)=>{
            if (err) return console.log(err);
            console.log("OTP enregisrré en base de données : ", otp);

            // Envoir de l'OTP par email
            await sendOTP (user.email, otp);
        }
    );
}

exports.verifyOTP = function(req, res) {
    // On récupère les données envoyées depuis le formulaire OTP (userId et otp)
    const { userId, otp } = req.body;

    // On cherche dans la table otp_codes le code envoyé par l'utilisateur
    // Il doit correspondre au user_id, au code, ne pas avoir été utilisé, et ne pas être expiré
    db.query(
        "SELECT * FROM otp_codes WHERE user_id = ? AND code = ? AND used = 0 AND expires_at >= NOW()",
        [userId, otp],
        (err, rows) => {
            // Si une erreur survient pendant la requête, on renvoie une erreur serveur
            if (err) return res.status(500).send("Erreur serveur");

            // Si aucune ligne n'est trouvée, le code est invalide ou expiré
            if (rows.length === 0) {
                return res.status(400).send("Code OTP invalide ou expiré");
            }

            // Récupérer l'ID du code OTP validé pour le marquer comme utilisé
            const otpId = rows[0].id;

            // Maintenant, on récupère les informations complètes de l'utilisateur
            db.query(
                "SELECT * FROM users WHERE id = ? LIMIT 1",
                [userId],
                (err2, users) => {
                    if (err2 || users.length === 0) {
                        // Si erreur ou utilisateur introuvable, renvoyer erreur
                        return res.status(500).send("Erreur serveur");
                    }

                    // On récupère l'objet utilisateur
                    const user = users[0];

                    // Marquer le code OTP comme utilisé pour qu'il ne puisse plus servir
                    db.query(
                        "UPDATE otp_codes SET used = 1 WHERE id = ?",
                        [otpId],
                        (err3) => {
                            if (err3) return res.status(500).send("Erreur serveur");

                            // Créer le JWT final avec id, role et nom de l'utilisateur
                            // process.env.JWT_SECRET est la clé secrète définie dans ton .env
                            const token = jwt.sign(
                                {
                                    id: user.id,
                                    role: user.role,
                                    name: user.name
                                },
                                process.env.JWT_SECRET || "defaultSecretKey",
                                { expiresIn: "5h" } // Token valide 5 heures
                            );

                            // Stocker le JWT dans un cookie sécurisé
                            // httpOnly empêche l'accès via JavaScript côté client
                            // secure false car on est en HTTP, mettre true en HTTPS
                            // maxAge définit la durée de vie du cookie en ms
                            res.cookie("token", token, {
                                httpOnly: true,
                                secure: false,
                                maxAge: 5 * 60 * 60 * 1000 // 5 heures
                            });

                            // Rediriger l'utilisateur vers le dashboard maintenant qu'il est connecté
                            res.redirect("/dashboard");
                        }
                    );
                }
            );
        }
    );
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