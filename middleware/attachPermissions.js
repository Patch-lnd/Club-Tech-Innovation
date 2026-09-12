// Attaches rol-based permissions to req.user 

const roleCapabilities = require("../utils/roleCapabilities")

module.exports = (req, res, next)=>{
    if(!req.user){
        return next();
    }
    // Extract role from authentificated user
    const role = req.user.role;

    // Attach perissions object 
    req.user.permissions = roleCapabilities[role] || {};
    next();
}