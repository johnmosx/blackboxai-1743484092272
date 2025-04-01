const { CropType } = require('../models');

module.exports = {
  createCropType: async (req, res) => {
    try {
      const { name, icon, description } = req.body;
      const cropType = await CropType.create({ name, icon, description });
      res.status(201).json(cropType);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getCropTypes: async (req, res) => {
    try {
      const cropTypes = await CropType.findAll();
      res.json(cropTypes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateCropType: async (req, res) => {
    try {
      const { id } = req.params;
      const [updated] = await CropType.update(req.body, {
        where: { id }
      });
      if (updated) {
        const updatedCropType = await CropType.findByPk(id);
        res.json(updatedCropType);
      } else {
        res.status(404).json({ error: 'Crop type not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteCropType: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await CropType.destroy({
        where: { id }
      });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Crop type not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};