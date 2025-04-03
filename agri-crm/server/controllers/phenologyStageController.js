const { PhenologyStage, CropType } = require('../models');

module.exports = {
  createStage: async (req, res) => {
    try {
      const { cropTypeId, name, description, order } = req.body;
      const cropType = await CropType.findByPk(cropTypeId);
      if (!cropType) return res.status(404).json({ error: 'Crop type not found' });
      
      const stage = await PhenologyStage.create({
        cropTypeId,
        name, 
        description,
        order
      });
      res.status(201).json(stage);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getStagesForCropType: async (req, res) => {
    try {
      const { cropTypeId } = req.params;
      const stages = await PhenologyStage.findAll({
        where: { cropTypeId },
        order: [['order', 'ASC']] 
      });
      res.json(stages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateStage: async (req, res) => {
    try {
      const { id } = req.params;
      const [updated] = await PhenologyStage.update(req.body, {
        where: { id }
      });
      if (updated) {
        const updatedStage = await PhenologyStage.findByPk(id);
        res.json(updatedStage);
      } else {
        res.status(404).json({ error: 'Stage not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteStage: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await PhenologyStage.destroy({
        where: { id }
      });
      if (deleted) {
        res.json({ success: true, message: 'Stage deleted successfully' });
      } else {
        res.status(404).json({ error: 'Stage not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};