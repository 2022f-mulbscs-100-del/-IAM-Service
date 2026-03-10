import LoginService from "../Services/LoginService.js";
import { loginSchema } from "../Validation/Validator.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
export const LoginController = async (req, res, next) => {
  const isValid = loginSchema.parse(req.body);
  if (!isValid) {
    return next(ErrorHandler("Validation failed", 400));
  }

  const { email, password } = req.body;

  try {
    const { user, tokens } = await LoginService.login(email, password);
    const { AccessToken, RefreshToken } = tokens;
    res.cookie("refreshToken", RefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
      accessToken: AccessToken,
    });
  } catch (error) {
    next(error);
  }
};
