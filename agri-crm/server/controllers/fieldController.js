const { Field, FieldHistory, CropType } = require('../models');

// Create new field
const createField = async (req, res) => {
  try {
    const { farmerId, name, geoJson, area, cropTypeId } = req.body;
    
    const field = await Field.create({
      farmerId,
      name,
      geoJson,
      area,
      currentCropTypeId: cropTypeId
    });

    // Create initial history entry
    await FieldHistory.create({
      fieldId: field.id,
      cropTypeId,
      date: new Date()
    });

    res.status(201).json(field);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all fields for a farmer
const getFarmerFields = async (req, res) => {
  try {
    const fields = await Field.findAll({
      where: { farmerId: req.params.farmerId },
      include: [
        { model: CropType, as: 'currentCropType' },
        { model: FieldHistory, as: 'history', include: [{ model: CropType, as: 'cropType' }] }
      ]
    });
    res.json(fields);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add field history entry
const addFieldHistory = async (req, res) => {
  try {
    const { yieldAmount, fertilizerUsed, notes } = req.body;
    const field = await Field.findByPk(req.params.fieldId);
    
    const historyEntry = await FieldHistory.create({
      fieldId: field.id,
      cropTypeId: field.currentCropTypeId, // Default to current crop
      yieldAmount,
      fertilizerUsed,
      notes,
      date: new Date()
    });

    res.status(201).json(historyEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update field's current crop
const updateFieldCrop = async (req, res) => {
  try {
    const { cropTypeId } = req.body;
    const field = await Field.findByPk(req.params.fieldId);
    
    field.currentCropTypeId = cropTypeId;
    await field.save();

    // Add to history
    await addFieldHistory(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createField,
  getFarmerFields,
  addFieldHistory,
  updateFieldCrop
};