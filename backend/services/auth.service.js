const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepo = require("../repositories/user.repository");

exports.register = async ({ name, email, password }) => {
  const exists = await userRepo.findByEmail(email);
  if (exists) throw new Error("User already exists");

  const hashed = await bcrypt.hash(password, 10);
  return userRepo.createUser({
    name,
    email,
    password: hashed
  });
};

exports.login = async ({ email, password }) => {
  const user = await userRepo.findByEmail(email);
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return { user, token };
};
