import ResetPasswordService from "../Services/ResetPasswordService.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";

export const VerifyCodeController = async (req, res, next) => {
  const { email, code } = req.body;
  try {
    const isValid = await ResetPasswordService.verifyCode(email, code);
    if (!isValid) {
      return next(ErrorHandler("Invalid reset code", 400));
    }

    res
      .status(200)
      .json({ success: true, message: "Reset code verified successfully" });
  } catch (error) {
    next(error);
  }
};
