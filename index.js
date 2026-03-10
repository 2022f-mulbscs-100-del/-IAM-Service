import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { loggerMiddleware } from "./Middleware/logger.middleware.js";
import AuthRoutes from "./Routes/index.js";
import prisma from "./Config/prisma.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerOptions from "./Config/swagger.js";
import swaggerUi from "swagger-ui-express";
import { ZodError } from "zod";

const app = express();

app.use(express.json());
app.use(loggerMiddleware);

app.get("/", (req, res) => {
  res.send(`IAM Service is running on port ${process.env.PORT}`);
});

app.use("/auth-routes", AuthRoutes);

//--------------Health Check----------------
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Healthy" });
});

//--------------Error Middleware----------------
app.use((err, req, res, next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      errors: err.issues.map((e) => ({
        // ← .issues not .errors
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }

  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    status: statusCode,
  });
});

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

async function testDb() {
  try {
    await prisma.$connect();
    //es-lint-disable-next-line no-console
    console.log("✅ Database connected!");
  } catch (error) {
    //es-lint-disable-next-line no-console
    console.error("❌ Connection failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testDb();

app.listen(process.env.PORT, () => {
  console.log(
    `IAM Service is running on port http://localhost:${process.env.PORT}`,
  );
});
