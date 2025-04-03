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
          as: 'fields',
          include: [
            {
              model: FieldHistory,
              order: [['createdAt', 'DESC']],
              as: 'fieldHistories', // Add this line to match the association alias
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

exports.updateFarmer = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Farmer.update(req.body, {
      where: { id }
    });

    if (!updated) {
      return res.status(404).json({ error: 'Farmer not found' });
    }

    const updatedFarmer = await Farmer.findByPk(id, {
      include: [{
        model: Field,
        as: 'fields', // Add this alias
        include: [{
          model: FieldHistory,
          as: 'fieldHistories' // Add this alias
        }]
      }]
    });

    res.json(updatedFarmer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteFarmer = async (req, res) => {
  try {
    const { id } = req.params;
    
    // First delete all related fields and their history
    await Field.destroy({ where: { farmerId: id } });
    
    // Then delete the farmer
    const deleted = await Farmer.destroy({ where: { id } });
    
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Farmer not found' });
    }
    
    return res.status(200).json({ success: true, message: 'Farmer deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.findAll({
      attributes: ['id', 'name', 'phone', 'email', 'createdAt'],
      order: [['name', 'ASC']],
      include: [{
        model: Field,
        as: 'fields',
        attributes: ['id', 'name', 'area'],
        include: [{
          model: FieldHistory,
          as: 'fieldHistories', // Add this line to match the association alias
          attributes: ['yieldAmount'],
          order: [['createdAt', 'DESC']],
          limit: 1
        }]
      }]
    });

    const formattedFarmers = farmers.map(farmer => ({
      ...farmer.get({ plain: true }),
      fields: farmer.fields.map(field => ({
        ...field.get({ plain: true }),
        latestYield: field.fieldHistories[0]?.yieldAmount || null
      }))
    }));

    res.json(formattedFarmers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

