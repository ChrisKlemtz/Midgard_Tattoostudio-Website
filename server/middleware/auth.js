const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    // Token aus Cookie holen
    const token = req.cookies.adminToken;
    
    if (!token) {
      return res.status(401).json({ message: 'Nicht autorisiert' });
    }

    // Token verifizieren
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.adminId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token ungültig' });
  }
};

module.exports = authMiddleware;