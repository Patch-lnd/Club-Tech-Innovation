exports.dashboard = (req, res)=>{
    const user = req.user;
    res.render("dashboard", {
        user,
        permissions: user.permissions
    });
}