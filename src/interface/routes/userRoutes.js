const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const ChangePasswordUseCase = require("../../app/user/ChangePasswordUseCase");
const RequestResetPasswordUseCase = require("../../app/user/RequestResetPasswordUseCase");
const ResetPasswordUseCase = require("../../app/user/ResetPasswordUseCase");
const UserRepositoryImpl = require("../../infra/db/UserRepositoryImpl");
const TokenRepositoryImpl = require("../../infra/db/TokenRepositoryImpl");

// Middleware
const authMiddleware = require("../middleware/authMiddleware");

// Dependencies
const bcrypt = require("bcrypt");
const prisma = require("../../infra/db/prisma/prismaClient");
const {sendEmail} = require("../utils/emailService");

// Initialization
const userRepository = new UserRepositoryImpl(prisma);
const tokenRepository = new TokenRepositoryImpl(prisma);
const changePasswordUseCase = new ChangePasswordUseCase(userRepository, bcrypt);
const requestResetPasswordUseCase = new RequestResetPasswordUseCase(
  userRepository,
  tokenRepository,
  sendEmail
);
const resetPasswordUseCase = new ResetPasswordUseCase(
  userRepository,
  tokenRepository,
  bcrypt,
  sendEmail
);
const userController = new UserController(
  changePasswordUseCase,
  requestResetPasswordUseCase,
  resetPasswordUseCase
);

// Routes
router.post("/change-password", authMiddleware, (req, res, next) =>
  userController.changePassword(req, res, next)
);
router.post("/reset-password/request", (req, res, next) =>
  userController.requestPasswordReset(req, res, next)
);
router.post("/reset-password", (req, res, next) =>
  userController.resetPassword(req, res, next)
);

module.exports = router;
