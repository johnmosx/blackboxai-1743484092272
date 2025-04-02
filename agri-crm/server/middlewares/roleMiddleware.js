const jwt = require('jsonwebtoken');

const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      const userRole = decoded.role;

      // Administrator has access to everything
      if (userRole === 'Administrator') {
        return next();
      }

      // Check if user has the required role
      if (userRole !== requiredRole) {
        return res.status(403).json({ error: 'Forbidden - Insufficient permissions' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
  };
};

module.exports = roleMiddleware;