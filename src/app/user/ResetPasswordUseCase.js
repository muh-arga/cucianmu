const User = require("../../domain/user/User");
const { BadRequestError } = require("../../errors");

class ResetPasswordUseCase {
  constructor(userRepositoryImpl, tokenRepositoryImpl, bcrypt, sendMail) {
    this.userRepository = userRepositoryImpl;
    this.tokenRepository = tokenRepositoryImpl;
    this.bcrypt = bcrypt;
    this.sendMail = sendMail;
  }

  async execute(data) {
    const token = await this.tokenRepository.findByToken(data.token);

    if (
      !token ||
      token.type !== "reset-password" ||
      token.expiresAt < Date.now()
    ) {
      throw new BadRequestError("Invalid or expired token");
    }

    const hashedPassword = await User.hashPassword(
      data.newPassword,
      this.bcrypt
    );

    await this.userRepository.update(token.userId, {
      password: hashedPassword,
    });
    await this.tokenRepository.delete(token.id);

    const resetMessage = `Your password has been reset successfully.`;

    await this.sendMail({
      to: token.user.email,
      subject: "Password Reset Success",
      text: resetMessage,
    });

    return true;
  }
}

module.exports = ResetPasswordUseCase;
