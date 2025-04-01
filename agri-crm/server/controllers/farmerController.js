const db = require('../models');
const Farmer = db.Farmer;
const Crop = db.Crop;

// Create and save a new Farmer
exports.createFarmer = async (req, res) => {
  try {
    const farmer = await Farmer.create(req.body);
    res.status(201).json(farmer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Retrieve all Farmers with their Crops
exports.getFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.findAll({
      include: [{
        model: Crop,
        as: 'crops'
      }]
    });
    res.json(farmers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Find a single Farmer by Id with Crops
exports.getFarmer = async (req, res) => {
  try {
    const farmer = await Farmer.findByPk(req.params.id, {
      include: [{
        model: Crop,
        as: 'crops'
      }]
    });
    if (!farmer) {
      return res.status(404).json({ error: 'Farmer not found' });
    }
    res.json(farmer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Farmer by Id
exports.updateFarmer = async (req, res) => {
  try {
    const [updated] = await Farmer.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedFarmer = await Farmer.findByPk(req.params.id);
      return res.json(updatedFarmer);
    }
    throw new Error('Farmer not found');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Farmer by Id
exports.deleteFarmer = async (req, res) => {
  try {
    const deleted = await Farmer.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) {
      throw new Error('Farmer not found');
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};