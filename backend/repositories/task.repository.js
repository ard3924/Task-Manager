const Task = require("../models/task.model");

exports.create = (data) => {
  return Task.create(data);
};

exports.findById = (id) => {
  return Task.findById(id);
};

exports.findAllForUser = (userId) => {
  return Task.find({
    $or: [{ creatorId: userId }, { assignedToId: userId }]
  }).sort({ dueDate: 1 });
};

exports.updateById = (id, data) => {
  return Task.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteById = (id) => {
  return Task.findByIdAndDelete(id);
};
