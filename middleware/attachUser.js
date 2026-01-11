const jwt = require("jsonwebtoken");
const db = require("../database/db");

module.exports = async (req, res, next) => {
    if(!req.cookies){
        res.locals.user  = null;
        return next();
    }
    const token = req.cookies.token;

    if (!token) {
        return next();
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        db.query(
            "SELECT id, name, email, avatar_url, role FROM users WHERE id = ? LIMIT 1",
            [decoded.id],
            (err, results)=>{
                if(err || results.length === 0){
                    res.locals.user = null;
                    return next();
                }
                res.locals.user = results[0]; // Ici on met l'user pour tous les vues
                next();
            }
        );
    }catch(err){
        res.locals.user = null;
        next();
    }
};