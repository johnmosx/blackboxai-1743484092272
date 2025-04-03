const { Field, FieldHistory, CropType } = require('../models');

exports.addFieldWithHistory = async (req, res) => {
  try {
    const { farmerId, history, ...fieldData } = req.body;
    const field = await Field.create({ ...fieldData, farmerId });

    if (history) {
      await FieldHistory.create({
        ...history,
        fieldId: field.id,
        cropTypeId: history.cropTypeId || field.currentCropTypeId
      });
    }

    const createdField = await Field.findByPk(field.id, {
      include: [
        { model: FieldHistory, order: [['createdAt', 'DESC']] },
        { model: CropType, as: 'currentCropType' }
      ]
    });

    res.status(201).json(createdField);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getFieldWithHistory = async (req, res) => {
  try {
    const field = await Field.findByPk(req.params.id, {
      include: [
        {
          model: FieldHistory,
          include: [CropType],
          order: [['createdAt', 'DESC']]
        },
        {
          model: CropType,
          as: 'currentCropType'
        }
      ]
    });

    if (!field) {
      return res.status(404).json({ error: 'Field not found' });
    }

    res.json(field);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateField = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Field.update(req.body, {
      where: { id }
    });

    if (!updated) {
      return res.status(404).json({ error: 'Field not found' });
    }

    const updatedField = await Field.findByPk(id, {
      include: [
        { model: FieldHistory, order: [['createdAt', 'DESC']] },
        { model: CropType, as: 'currentCropType' }
      ]
    });

    res.json(updatedField);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteField = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Field.destroy({
      where: { id }
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Field not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};