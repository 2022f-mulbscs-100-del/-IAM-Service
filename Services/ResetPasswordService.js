import prisma from "../Config/prisma.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { ExpiryCheck } from "../utils/ExpiryCheck.js";
import { GenerateCode } from "../utils/GenerateCode.js";
import SignUpService from "./SignUpService.js";

class ResetPasswordService {
  static async resetPassword(email) {
    const userExists = await SignUpService.GETUSER(email);
    if (!userExists) {
      throw ErrorHandler(404, "User not found");
    }
    const resetToken = GenerateCode(6);
    const resetCodeExpiry = new Date(new Date().getTime() + 15 * 60 * 1000);
    await prisma.auth.update({
      where: { userId: userExists.id },
      data: { resetCode: resetToken, resetCodeExpiry: resetCodeExpiry },
    });
    return resetToken;
  }

  static async verifyCode(email, code) {
    const userExists = await SignUpService.GETUSER(email);
    if (!userExists) {
      throw ErrorHandler(404, "User not found");
    }

    if (ExpiryCheck(userExists.auth.resetCodeExpiry)) {
      throw ErrorHandler(400, "Reset code has expired");
    }
    if (userExists.auth.resetCode !== code) {
      throw ErrorHandler(400, "Invalid reset code");
    }
    await prisma.auth.update({
      where: { userId: userExists.id },
      data: { resetCode: null, resetCodeExpiry: null },
    });
    return true;
  }
}

export default ResetPasswordService;
