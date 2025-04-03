const { Farmer, Field } = require('../models');

exports.createFarmer = async (req, res) => {
  try {
    const farmer = await Farmer.create(req.body);
    res.status(201).json(farmer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getFarmerDetails = async (req, res) => {
  try {
    const farmer = await Farmer.findByPk(req.params.id, {
      include: [
        {
          model: Field,
          include: [
            {
              model: FieldHistory,
              order: [['createdAt', 'DESC']],
              limit: 1
            },
            {
              model: CropType,
              as: 'currentCropType'
            }
          ]
        }
      ]
    });

    if (!farmer) {
      return res.status(404).json({ error: 'Farmer not found' });
    }

    res.json(farmer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addFarmerField = async (req, res) => {
  try {
    const { farmerId } = req.params;
    const field = await Field.create({ 
      ...req.body, 
      farmerId 
    });
    res.status(201).json(field);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};