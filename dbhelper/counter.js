const model = require('../models/counter_schema');
exports.getSequenceById = async (id) => {
  const { sequence_value } = await model.findOneAndUpdate({ _id: id }, { $inc: { sequence_value: +1 } }, { new: true });
  return sequence_value;
};
