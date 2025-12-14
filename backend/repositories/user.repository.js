const User = require("../models/user.model");

exports.findByEmail = (email) => {
  return User.findOne({ email });
};

exports.createUser = (data) => {
  return User.create(data);
};

exports.findById = (id) => {
  return User.findById(id).select("-password");
};
