const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Admin } = require('../models');

const verifyToken = (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ valid: false, error: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    res.json({ valid: true });
  } catch (error) {
    res.status(401).json({ valid: false, error: 'Invalid token' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const admin = await Admin.findOne({ where: { username } });
    if (!admin || !admin.isActive) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create token with role information
    const token = jwt.sign(
      { 
        id: admin.id, 
        email: admin.email, 
        username: admin.username,
        role: admin.role 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );

    res.json({ 
      token,
      user: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    // Return minimal user info without sensitive data
    const user = {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role
    };
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user data' });
  }
};

module.exports = {
  login,
  verifyToken,
  getCurrentUser
};
