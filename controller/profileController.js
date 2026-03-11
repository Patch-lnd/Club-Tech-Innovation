const db = require("../database/db"); // Configuration MySQL

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
