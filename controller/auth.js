const mysql = require("mysql");
// Getting the jasonwebtoken module
const jwt = require("jsonwebtoken")
// Getting the encryption mudule for ourt passwords
const bcrypt = require("bcryptjs");

const crypto = require("crypto");
// Generates revocable tokens for email link durring account creation

const {generateOTP} = require("../middleware/otp");
// generates Mailer module to send OTP to users
const {sendOTP, sendEmailVerify} = require("../middleware/mailer");
const e = require("express");
// Sends the mails to users


//Database Initialization
const db = mysql.createConnection({
    host: process.env.db_host, 
    user: process.env.db_user, 
    password: process.env.db_password,
    database:process.env.DataBase
});
 
exports.connexion = async (req, res) => {
    /* const name = req.body.name
       const email = req.body.email
       const password = req.body.password
       const passwordConfim = req.body.passwordConfim
    */

    // Using destructuring syntax
    // We collect the data sent by the html form 
    const { name, email, password, passwordConfirm } = req.body


    // Vérification de la longueur du mot de passe
    if (password.length < 6) {
        return res.render('connexion', {
            message: "Le mot de passe doit contenir au moins 6 caractères",
            success: null
        })
    }

    // Vérification si l'utilisateur existe déjà dans la table users
    // "result" commes out as an array, so we wanna check how many came out
    //If >0 it means it's already an email with value on our db
    // "result" will contain only the email and name columns, making the query more efficient
    db.query('SELECT email, name FROM users WHERE email = ? OR name = ?', [email, name], async (error, result) => {
        if (error) {
            console.log(error)
            return res.render('connexion', {
                message: "An error occurred while checking the database.",
                success: null
            });
        }

        // Si on trouve un résultat, l'utilisateur existe déjà
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
        } else if (password !== passwordConfirm) {
            // Vérification que le mot de passe et la confirmation correspondent
            return res.render('connexion', {
                message: "Mot de passe différent",
                success: null
            })
        }

        // Vérification également dans la table pending_users
        db.query(
            'SELECT id, name, email, password, token_expires_at FROM pending_users WHERE email = ? OR name = ? LIMIT 1',
            [email, name],
            async (pendingErr, pendingResult) => {
                if (pendingErr) {
                    console.log(pendingErr);
                    return res.render('connexion', {
                        message: "An error occurred while checking the database.",
                        success: null
                    });
                }

                // Si un compte est déjà en cours de création
                if (pendingResult.length > 0) {

                    const pendingUser = pendingResult[0];

                    // CASE 1: Token is still valid -> Block and ask user to wait or resend 
                    if (new Date(pendingUser.token_expires_at) > new Date()) {
                        return res.render('connexion', {
                            message: "Un compte avec ce nom ou email est déjà en cours de création. Veuillez vérifier votre email.",
                            success: null
                        });
                    }

                    // CASE 2: Token is expired -> Allow recreation by updating the pending record 

                    // Our "password" is hashed 8 times which is the standard for a good hashing 
                    let hashedPassword = await bcrypt.hash(password, 8)

                    // We generate a new token and new expiration date
                    const newEmailToken = crypto.randomBytes(32).toString("hex");
                    const newTokenExpriresAt = new Date(Date.now() + 15*60*60*1000);

                    const updateQuery = `UPDATE pending_users SET name = ?, email = ?, password = ?, email_token = ?, token_expires_at = ? WHERE id = ?`;

                    db.query( updateQuery, [name, email, hashedPassword, newEmailToken, newTokenExpriresAt, pendingUser.id],
                        async(updateErr)=>{
                            if(updateErr){
                                console.log(updateErr);
                                return res.render('connexion', {
                                    message: "Erreur lors de la mise a jour du compte en attente.",
                                    success: null
                                });
                            }
                            // Send the now verification email 
                            // Construction du lien de vérification
                            // Déterminer si on est sur http ou https
                            const protocol = req.secure ? 'https' : 'http';
                            // Récupérer dynamiquement le nom de domaine ou l'adresse IP du serveur
                            const host = req.get('host');
                            // Lien complet pour vérifier l'email
                            const verificationLink = `${protocol}://${host}/auth/verify-email?token=${newEmailToken}`;

                            // Envoi de l'email de vérification
                            await sendEmailVerify(email, `Bienvenue ${name} ! Veuillez vérifier votre email en cliquant sur ce lien : ${verificationLink}`);

                            // Message pour informer l'utilisateur
                            return res.render("connexion", {
                                message: null,
                                success: "Un email de confirmation a été envoyé. Vérifiez votre boîte mail."
                            });
                        }
                    );
                    // IMPORTANT : stop the execution here 
                    return;
                }

                // IF NO PENDING USER EXIST -> CONTINUE NORMAL CREATION

                // Si tout est bon, on peut maintenant hasher le mot de passe
                // We "await" since the encryption can take little longer than normal 
                // Form execution time. We then add "async" at the beginning of our function db.query

                // Our "password" is hashed 8 times which is the standard for a good hashing 
                let hashedPassword = await bcrypt.hash(password, 8)

                console.log("Password hashed:", hashedPassword)
                console.log("Password plain:", password)
                
                // Génération du token pour la vérification email
                const emailToken = crypto.randomBytes(32).toString("hex");

                // Expiration du token dans 15 minutes
                const tokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15min from now

                // Insertion dans la table pending_users
                const insertQuery = "INSERT INTO pending_users (name, email, password, email_token, token_expires_at) VALUES (?, ?, ?, ?, ?)";
                db.query(insertQuery,
                    [name, email, hashedPassword, emailToken, tokenExpiresAt],
                    async (err2) => {
                        if (err2) {
                            console.log(err2);
                            return res.render("connexion", {
                                message: "Erreur lors de la création du compte",
                                success: null
                            })
                        }

                        // Construction du lien de vérification
                        // Déterminer si on est sur http ou https
                        const protocol = req.secure ? 'https' : 'http';
                        // Récupérer dynamiquement le nom de domaine ou l'adresse IP du serveur
                        const host = req.get('host');
                        // Lien complet pour vérifier l'email
                        const verificationLink = `${protocol}://${host}/auth/verify-email?token=${emailToken}`;

                        // Envoi de l'email de vérification
                        await sendEmailVerify(email, `Bienvenue ${name} ! Veuillez vérifier votre email en cliquant sur ce lien : ${verificationLink}`);

                        // Message pour informer l'utilisateur
                        return res.render("connexion", {
                            message: null,
                            success: "Un email de confirmation a été envoyé. Vérifiez votre boîte mail."
                        });
                    }
                )
            }
        )
    })
}


/*  db.query("INSERT INTO users SET ?", {name: name, email: email, password: hashedPassword}, (error, result) =>{
            if (error) {
                console.log(error)
            }else{
                console.log(result)
                return res.render('connexion' ,{
                    success: "Compte Crée avec Success",
                    message: null
                }) 
            }
        }) */

exports.verifyEmail = async (req, res)=> {
    try{
        // Step 1 : GET the token from the query string of the URL 
        // Example: https://mysite.com/auth/verify-email?token=abcd1234
        const {token} = req.query;
        // STEP 2 : Check if toekn is privided
        if(!token){
            return res.render("connexion", {
                message: "Token is missing from te URL.",
                success: null
            })
        }
        // STEP 3: Look for the token in the pending_sers table 
        const query = 'SELECT * FROM pending_users WHERE email_token = ? AND token_expires_at >= NOW() LIMIT 1';
        db.query(query, [token], async (err, results)=>{
            if(err){
                console.log(err);
                return res.render('connexion',{
                    message: "Erreur de base de données lors de la verification de l'email",
                    success: null
                })
            }
            // STEP 4: Check id token exists and is valid 
            if(results.length === 0){
                return res.render("connexion", {
                    message: "Lien Invalid ou expiré. Veuillez vous inscrire à nouveau.",
                    success: null
                })
            }
            // STEP 5: GET the user data from pending_users
            const pendingUser = results[0];
            const {name, email, password} = pendingUser;

            // STEP 6 : Insert the user inot the main user table 
            const insertQuery = "INSERT INTO users (name, email, password) VALUES(?, ?, ?)";
            db.query(insertQuery, [name, email, password], (insertErr, insertResult)=>{
                if(insertErr){
                    console.log(insertErr);
                    return res.render("connexion", {
                        message: "Erreur de Base de données lors de la création du compte.",
                        success: null
                    })
                }
                // STEP 7: Remove the entry from pending_users table
                const deleteQuery  = "DELETE FROM pending_users WHERE id = ?";
                db.query(deleteQuery, [pendingUser.id], (deleteErr, deleteResult)=>{
                    if(deleteErr){
                        console.log(deleteErr);
                        // Not blocking the user here, just logging the error
                    }
                    // STEP 8 : Auto-login the user after successful verification using JWT 
                    const tokenJWT = jwt.sign({
                        id: insertResult.insertId, name, email
                    },
                    process.env.JWT_SECRET ||"defaultSecretKey",
                {
                    expiresIn: "5h" // Token valid for 5 hours
                })

                    // STEP 9: Set the JWT as httpOnly cookie 
                    res.cookie("token", tokenJWT, {
                        httpOnly: true,
                        secure: req.secure, // Use HTTPS in production
                        maxAge: 5 * 60 * 60 * 1000 // 5 hours
                    })

                    // STEP 10: Redirect to dashboard(login) after successful verification
                    return res.redirect("/dashboard");
                })
            })
        })
    }catch(err){
        console.log(err);
        return res.render("connexion", {
            message: "Une erreur est survenue lors de la vérification de l'email.",
            success: null
        })
    }
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