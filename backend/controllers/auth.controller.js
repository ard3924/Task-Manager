const authService = require("../services/auth.service");
const { registerDto, loginDto } = require("../dtos/auth.dto");

exports.register = async (req, res) => {
  try {
    const data = registerDto.parse(req.body);
    await authService.register(data);
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const data = loginDto.parse(req.body);
    const { user, token } = await authService.login(data);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false // true in production
    });

    res.json({
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
