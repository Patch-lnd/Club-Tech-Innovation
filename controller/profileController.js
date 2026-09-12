const db = require("../database/db"); // Configuration MySQL
const bcrypt = require("bcryptjs"); // Pour le hashage des mots de passe

exports.editProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        // On garde l'ancien avatar si aucun fichier uploadé
        let avatarPath = req.user.avatar_url;

        // Si un nouveau fichier est uploadé
        if (req.file) {
            avatarPath = "/uploads/avatars/" + req.file.filename;
        }

        // Requête pour mettre à jour l'utilisateur
        const query = `UPDATE users SET name = ?, email = ?, avatar_url = ? WHERE id = ?`;
        db.query(query, [name, email, avatarPath, req.user.id], (err, result) => {
            if (err) {
                console.log("Erreur update user:", err);
                return res.render("profile/edit", {
                    user: req.user,
                    success: null,
                    error: "Erreur lors de la mise à jour du profil. Veuillez réessayer.",
                });
            }

            // Mise à jour de req.user pour refléter les changements immédiatement
            req.user.name = name;
            req.user.email = email;
            req.user.avatar_url = avatarPath;

            // 🔹 Mise à jour du cookie UI pour que l'avatar soit visible sur toutes les pages
            res.cookie("ui_user", {
                id: req.user.id,
                name: req.user.name,
                avatar_url: avatarPath
            }, {
                httpOnly: true,       // Pas accessible via JS côté client
                secure: false,        // true si HTTPS
                sameSite: "lax",
                maxAge: 5 * 60 * 60 * 1000 // 5 heures INACTVE FI
            });

            return res.render("profile/edit", {
                user: req.user,
                success: "Profil mis à jour avec succès !",
                error: null
            });
        });

    } catch (error) {
        console.log("Erreur editProfile:", error);
        res.render("profile/edit", {
            user: req.user,
            error: "Erreur serveur, veuillez réessayer plus tard.",
            success: null
        });
    }
};

// Change the password of the currently authenticated user
exports.changePassword = async (req, res) => {
    try {
        const {
            current_password,
            new_password,
            confirm_password
        } = req.body;

        // Make sure all required fields are provided
        if (!current_password || !new_password || !confirm_password) {
            return res.render("profile/password", {
                user: req.user,
                error: "Veuillez remplir tous les champs.",
                success: null
            });
        }

        // Check the new password security requirements
        /* 
        (?=.*[a-z])   → au moins une minuscule
        (?=.*[A-Z])   → au moins une majuscule
        (?=.*\d)      → au moins un chiffre
        .{8,}         → au moins 8 caractères 
        */
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!passwordRegex.test(new_password)) {
            return res.render("profile/password", {
                user: req.user,
                error: "Le nouveau mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.",
                success: null
            });
        }

        // Check that the two new passwords are identical
        if (new_password !== confirm_password) {
            return res.render("profile/password", {
                user: req.user,
                error: "Les deux nouveaux mots de passe ne correspondent pas.",
                success: null
            });
        }

        // Get the current password hash from the database
        db.query(
            "SELECT password FROM users WHERE id = ? LIMIT 1",
            [req.user.id],
            async (err, results) => {
                if (err) {
                    console.log("Error retrieving current password:", err);

                    return res.render("profile/password", {
                        user: req.user,
                        error: "Une erreur est survenue. Veuillez réessayer.",
                        success: null
                    });
                }

                // Make sure the user still exists
                if (results.length === 0) {
                    return res.render("profile/password", {
                        user: req.user,
                        error: "Utilisateur introuvable.",
                        success: null
                    });
                }

                const storedPasswordHash = results[0].password;

                // Compare the entered current password with the stored hash
                const passwordMatches = await bcrypt.compare(
                    current_password,
                    storedPasswordHash
                );

                // Stop if the current password is incorrect
                if (!passwordMatches) {
                    return res.render("profile/password", {
                        user: req.user,
                        error: "Votre mot de passe actuel est incorrect.",
                        success: null
                    });
                }

                // Hash the new password with bcrypt using 8 salt rounds
                const newPasswordHash = await bcrypt.hash(new_password, 8);

                // Save the new password hash in the database
                db.query(
                    "UPDATE users SET password = ? WHERE id = ?",
                    [newPasswordHash, req.user.id],
                    (updateErr, result) => {
                        if (updateErr) {
                            console.log("Error updating password:", updateErr);

                            return res.render("profile/password", {
                                user: req.user,
                                error: "Impossible de modifier le mot de passe. Veuillez réessayer.",
                                success: null
                            });
                        }

                        // Keep the current JWT session active
                        return res.render("profile/password", {
                            user: req.user,
                            error: null,
                            success: "Votre mot de passe a été modifié avec succès."
                        });
                    }
                );
            }
        );

    } catch (error) {
        console.log("Error changePassword:", error);

        return res.render("profile/password", {
            user: req.user,
            error: "Erreur serveur. Veuillez réessayer plus tard.",
            success: null
        });
    }
};