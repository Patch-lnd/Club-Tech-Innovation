// roleMiddleware.js 
// Middleware to restrict access based on user roles

exports.authorizedRoles = (...allowedRoles)=>{
    // We return a function because Express middlewares receive (req, res, next)
    return (req, res, next) =>{
        // req.user is set by the 'protect' middleware after verifying JWT 
        if(!req.user){
            // If user is not logged in, redirect to login 
            return res.redirect("/login");
        }

        // Check if user's role is inclded in the allowed roles 
        if(!allowedRoles.includes(req.user.role)){
            // If role is not allowed, redirect or show an error 
            return res.estatus(403).send("Access denied: Vous n'avais pas d'authorization pour cette page");
        }
        // If role os allowed, continue to the next middleware or controller 
        next();
    }
}