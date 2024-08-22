function validateIdParam(req, res, next) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid param ID. Expected an integer.' });
    }
    req.params.id = id;
    next();
}

module.exports = { validateIdParam };