const {
  changePasswordSchema,
  requestResetPasswordSchema,
  resetPasswordSchema,
} = require("../validators/UserValidator");

class UserController {
  constructor(
    changePasswordUseCase,
    requestResetPasswordUseCase,
    resetPasswordUseCase
  ) {
    this.changePasswordUseCase = changePasswordUseCase;
    this.requestResetPasswordUseCase = requestResetPasswordUseCase;
    this.resetPasswordUseCase = resetPasswordUseCase;
  }

  async changePassword(req, res) {
    const data = req.body;
    const userId = req.user.id;

    const { error } = changePasswordSchema.validate(data);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    try {
      data;
      const updatedUser = await this.changePasswordUseCase.execute(
        userId,
        data
      );

      return res.status(200).json({
        message: "Password updated successfully",
      });
    } catch (error) {
      return res.status(error.statusCode).json({ message: error.message });
    }
  }

  async requestPasswordReset(req, res, next) {
    const { email } = req.body;

    const { error } = requestResetPasswordSchema.validate({ email });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    try {
      await this.requestResetPasswordUseCase.execute(email);
      return res.status(200).json({
        message: "Password reset link sent to your email",
      });
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req, res, next) {
    const data = req.body;

    const { error } = resetPasswordSchema.validate(data);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    try {
      await this.resetPasswordUseCase.execute(data);
      return res.status(200).json({
        message: "Password reset successfully",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
