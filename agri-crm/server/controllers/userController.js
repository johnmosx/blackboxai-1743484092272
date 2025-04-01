const bcrypt = require('bcryptjs');
const { Admin } = require('../models');

// Update user (Admin only)
const updateUser = async (req, res) => {
  try {
    if (req.user.role !== 'Administrator') {
      return res.status(403).json({ error: 'Only administrators can update users' });
    }

    const { id } = req.params;
    const [updated] = await Admin.update(req.body, {
      where: { id }
    });
    
    if (updated) {
      const updatedUser = await Admin.findByPk(id, {
        attributes: ['id', 'username', 'email', 'role', 'isActive']
      });
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create new user (Admin only)
const createUser = async (req, res) => {
  try {
    if (req.user.role !== 'Administrator') {
      return res.status(403).json({ error: 'Only administrators can create users' });
    }

    const { username, email, password, role } = req.body;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await Admin.create({
      username,
      email,
      password: hashedPassword,
      role,
      isActive: true
    });

    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users (Admin only)
const getUsers = async (req, res) => {
  try {
    if (req.user.role !== 'Administrator') {
      return res.status(403).json({ error: 'Only administrators can view users' });
    }

    const users = await Admin.findAll({
      attributes: ['id', 'username', 'email', 'role', 'isActive']
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Change password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await Admin.findByPk(req.user.id);

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Update password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  changePassword,
  updateUser
};