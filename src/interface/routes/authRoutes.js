const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");
const LoginUseCase = require("../../app/auth/LoginUseCase");
const RegisterUserUseCase = require("../../app/auth/RegisterUserUseCase");
const UpdateUserUseCase = require("../../app/auth/UpdateUserUseCase");
const UserRepositoryImpl = require("../../infra/db/UserRepositoryImpl");

// Middleware
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Dependencies
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../../infra/db/prisma/prismaClient");

// Initialization
const userRepository = new UserRepositoryImpl(prisma);
const loginUseCase = new LoginUseCase(
  userRepository,
  bcrypt,
  jwt,
  process.env.JWT_SECRET
);
const registerUserUseCase = new RegisterUserUseCase(
  userRepository,
  bcrypt,
  jwt,
  process.env.JWT_SECRET
);
const updateUserUseCase = new UpdateUserUseCase(
  userRepository
);

const authController = new AuthController(loginUseCase, registerUserUseCase, updateUserUseCase);

// Routes
router.post("/login", (req, res) => authController.login(req, res));
router.post("/register", (req, res) => authController.register(req, res));
router.get("/me", authMiddleware, (req, res) => authController.getLoggedInUser(req, res));
router.put("/me", authMiddleware, upload.single("image"), (req, res) => authController.updateProfile(req, res));
router.get("/logout", authMiddleware, (req, res) => authController.logout(req, res));

module.exports = router
