const jwt = require('jsonwebtoken');

module.exports = function authMiddleware(req, res, next) {
  // First try Authorization header (Bearer)
  let token = null;
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (authHeader) {
    const parts = authHeader.split(' ');
    if (parts.length === 2 && /^Bearer$/i.test(parts[0])) {
      token = parts[1];
    }
  }

  // If no header token, try cookie (parse from header)
  if (!token && req.headers && req.headers.cookie) {
    const m = req.headers.cookie.match('(?:^|; )token=([^;]*)');
    if (m) token = decodeURIComponent(m[1]);
  }

  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, email: decoded.email };
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};