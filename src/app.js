const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const logger = require("./utils/logger");
const { connectDB } = require("./utils/database");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const likesRoutes = require("./routes/likes");
const commentsRoutes = require("./routes/comments");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

/**
 * Express application setup and configuration
 */
const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors());

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Swagger/OpenAPI setup
const serverUrl = process.env.BASE_URL || "/";
const swaggerDefinition = {
  openapi: "3.0.3",
  info: {
    title: "Social Media Backend API",
    version: "1.0.0",
    description: "API documentation for the Social Media Backend",
  },
  servers: [
    {
      url: `${serverUrl}`,
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "string" },
          username: { type: "string" },
          email: { type: "string" },
          full_name: { type: "string" },
          created_at: { type: "string", format: "date-time" },
        },
      },
      RegisterRequest: {
        type: "object",
        required: ["username", "email", "password", "full_name"],
        properties: {
          username: { type: "string" },
          email: { type: "string", format: "email" },
          password: { type: "string" },
          full_name: { type: "string" },
        },
      },
      LoginRequest: {
        type: "object",
        required: ["username", "password"],
        properties: {
          username: { type: "string" },
          password: { type: "string" },
        },
      },
      Post: {
        type: "object",
        properties: {
          id: { type: "string" },
          content: { type: "string" },
          user_id: { type: "string" },
          created_at: { type: "string", format: "date-time" },
        },
      },
      Comment: {
        type: "object",
        properties: {
          id: { type: "string" },
          post_id: { type: "string" },
          user_id: { type: "string" },
          content: { type: "string" },
          created_at: { type: "string", format: "date-time" },
        },
      },
    },
  },
};

const swaggerOptions = {
  definition: swaggerDefinition,
  apis: [
    `${__dirname}/routes/*.js`,
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.get("/api/docs.json", (req, res) => res.json(swaggerSpec));
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/likes", likesRoutes);
app.use("/api/comments", commentsRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Global error handler
app.use((err, req, res, next) => {
  logger.critical("Unhandled error:", err);
  res.status(500).json({
    error: "Internal server error",
    ...(process.env.NODE_ENV === "development" && { details: err.message }),
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

/**
 * Start the server
 */
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      logger.verbose(`Server is running on port ${PORT}`);
      logger.verbose(
        `Environment: ${process.env.NODE_ENV || "development"}`
      );
    });
  } catch (error) {
    logger.critical("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
