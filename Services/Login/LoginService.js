import { ErrorHandler } from "../../utils/ErrorHandler.js";
import SignUpService from "./SignUpService.js";
import bcrypt from "bcryptjs";
class LoginService {
  // Validate password
  static async VALIDATEPASSWORD(password, hashedPassword) {
    const isValid = await bcrypt.compare(password, hashedPassword);
    return !!isValid;
  }

  // Login user
  static async login(email, password) {
    const userExists = await SignUpService.GETUSER(email);
    if (!userExists) {
      return ErrorHandler("User does not exist", 401);
    }
    const isValid = await LoginService.VALIDATEPASSWORD(
      password,
      userExists.auth.password,
    );
    if (!isValid) {
      return ErrorHandler("Invalid credentials", 401);
    }
    const tokens = SignUpService.GENERATETOKENS(userExists);
    return { user: userExists, tokens };
  }
}

export default LoginService;
