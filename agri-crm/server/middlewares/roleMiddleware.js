const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userRole = req.user.role;
    
    // Administrator has access to everything
    if (userRole === 'Administrator') {
      return next();
    }

    // Check if user has the required role
    if (userRole !== requiredRole) {
      return res.status(403).json({ error: 'Forbidden - Insufficient permissions' });
    }

    next();
  };
};

module.exports = roleMiddleware;