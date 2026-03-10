import bcrypt from "bcryptjs";
import prisma from "../../Config/prisma.js";
import { GenerateToken } from "../../utils/GenerateToken.js";
import { ErrorHandler } from "../../utils/ErrorHandler.js";
class SignUpService {
  // Check if user already exists
  static async UserExists(email) {
    const user = await prisma.users.findUnique({
      where: { email },
    });
    return !!user; // Returns true if user exists, false otherwise
  }

  // Hash password
  static async HASHEDPASSWORD(password) {
    return await bcrypt.hash(password, 10);
  }

  // Generate access and refresh tokens
  static GENERATETOKENS(user) {
    const AccessToken = GenerateToken(user, "1m");
    const RefreshToken = GenerateToken(user, "7d");
    return { AccessToken, RefreshToken };
  }

  // Create new user
  static async CreateUser(name, email, password, role) {
    const hashedPassword = await SignUpService.HASHEDPASSWORD(password);
    const user = await prisma.users.create({
      data: {
        name,
        email,
      },
    });

    await prisma.auth.create({
      data: {
        password: hashedPassword,
        role: role || "USER",
        userId: user.id,
      },
    });

    return user;
  }

  static async GETUSER(email) {
    const user = await prisma.users.findUnique({
      where: { email },
      include: {
        auth: true,
      },
    });
    return user;
  }

  // Sign up user
  static async SignUp(name, email, password, role) {
    // Check if user exists
    const userExists = await SignUpService.UserExists(email);
    if (userExists) {
      throw ErrorHandler(400, "User already exists"); // Throw the error
    }

    // Create user and generate tokens
    const user = await SignUpService.CreateUser(name, email, password, role);
    const tokens = SignUpService.GENERATETOKENS(user);
    return { user, ...tokens };
  }
}
export default SignUpService;
