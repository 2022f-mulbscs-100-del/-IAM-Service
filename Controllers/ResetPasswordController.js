import ResetPasswordService from "../Services/ResetPasswordService.js";
import { z } from "zod";
export const ResetPasswordController = async (req, res, next) => {
  const { email: bodyEmail } = req.body;
  z.email().parse(bodyEmail);
  try {
    const resetToken = await ResetPasswordService.resetPassword(bodyEmail);
    res
      .status(200)
      .json({
        success: true,
        message: "Password reset email sent",
        resetToken,
      });
  } catch (error) {
    next(error);
  }
};
