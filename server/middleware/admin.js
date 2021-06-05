
module.exports = function (req, req, next) {
    // 401 unauthorised
    // 403 forbidden

    if (!req.user.isAdmin) return res.status(403).send('Access denied.');

    next();
}