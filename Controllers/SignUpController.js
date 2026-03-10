import SignUpService from "../Services/Login/SignUpService.js";
import { signUpSchema } from "../Validation/Validator.js";

export const SignUpController = async (req, res, next) => {
  try {
    // Validate request body`
    signUpSchema.parse(req.body);

    const { name, email, password, role } = req.body;

    const {
      user: newUser,
      AccessToken,
      RefreshToken,
    } = await SignUpService.SignUp(name, email, password, role);

    res.cookie("refreshToken", RefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
      AccessToken,
    });
  } catch (error) {
    next(error);
  }
};
