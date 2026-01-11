const db = require("../database/db");

module.exports = (req, res, next) => {
    const userId = req.cookies.userId;

    if (!userId) {
        res.locals.user = null;
        return next();
    }

    db.query(
        "SELECT id, name, email, avatar_url FROM users WHERE id = ?",
        [userId],
        (err, results) => {
            if (err || results.length === 0) {
                res.locals.user = null;
                return next();
            }

            req.user = results[0];
            res.locals.user = req.user;
            next();
        }
    );
};
