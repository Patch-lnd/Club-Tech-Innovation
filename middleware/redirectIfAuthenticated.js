const jwt = require("jsonwebtoken");

exports.redirectIfAuthenticated = (req, res, next)=> {

    // On récupere le token dans les cookies 
    const token =  req.cookies.token;

    if(!token){
        // Pas de toekn -> l'utilisateur n'est pas conecté -> continuer vers la page
        return next();
    }
    try{
        // Vérifier si le token est valide 
        jwt.verify(token, process.env.JWT_SECRET);
        // Token valid -> l'utilisateur est déja connecté -> redirection vers dahsboard 
        
        return res.redirect("/dashboard");

    }catch (err){
        // Si erreur (toekn invalide, expiré, ..) ->On le suprimme,  Continuer normalement 
        res.clearCookie("token");
        return next();
    }
}

// Exporter dirrectement la fonction 
/* module.exports = redirectIfAuthenticated; */