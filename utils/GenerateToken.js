import { ErrorHandler } from "./ErrorHandler.js";
import jwt from "jsonwebtoken";

export const GenerateToken = (user, time) => {
  if (!user) {
    throw ErrorHandler("User data is required to generate access token", 400);
  }
  const payload = {
    id: user.id,
    email: user.email,
    role: user.auth.role,
  };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: time,
  });
};
