const jwt = require("jsonwebtoken");

exports.redirectIfAuthenticated = (req, res, next)=> {
    try{
        // On récupere le token dans les cookies 
        const token =  req.cookies.token;
        if(!token){
            // Pas de toekn -> l'utilisateur n'est pas conecté -> continuer vers la page
            return next();
        }
        // Vérifier si le token est valide 
        const decoded = jwt.verify(token, process.env.JWT_SECRET ||"defaultSecrerKey");

        if (decoded){
            // Si le token est valide -> l'utilisateur est déja connecté -> redirection vers dahsboard 
            return res.redirect("/dashboard");
        }
    }catch (err){
        // Si erreur (toekn invalide, expiré, ..) -> Continuer normalement 
        return next();
    }
    // Si pas de token ou erreur -> Continuer vers la route 
    next();
}

// Exporter dirrectement la fonction 
/* module.exports = redirectIfAuthenticated; */