const { verifyToken } = require('./auth');

const requireAuth = (req, res, next) => {
    let token = req.headers.authorization?.split(' ')[1];

    // Also check cookie
    if (!token && req.cookies) {
        token = req.cookies['auth-token'];
    }

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ error: 'Invalid Token' });
    }

    req.user = decoded;
    next();
};

module.exports = { requireAuth };
