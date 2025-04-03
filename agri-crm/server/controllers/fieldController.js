exports.createField = async (req, res) => {
  try {
    const field = await Field.create({
      ...req.body,
      farmerId: req.params.farmerId
    });
    res.status(201).json(field);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addFieldHistory = async (req, res) => {
  try {
    const field = await Field.findByPk(req.params.fieldId);
    const history = await FieldHistory.create({
      ...req.body,
      fieldId: field.id,
      cropTypeId: req.body.cropTypeId || field.currentCropTypeId
    });
    res.status(201).json(history);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};