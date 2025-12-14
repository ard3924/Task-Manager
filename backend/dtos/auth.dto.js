const { z } = require("zod");

exports.registerDto = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
});

exports.loginDto = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});
