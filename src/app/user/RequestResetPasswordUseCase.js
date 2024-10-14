class RequestResetPasswordUseCase {
  constructor(userRepositoryImpl, tokenRepositoryImpl, sendMail) {
    this.userRepository = userRepositoryImpl;
    this.tokenRepository = tokenRepositoryImpl;
    this.sendMail = sendMail;
  }

  async execute(email) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const token = Math.floor(100000 + Math.random() * 900000).toString();
    const tokenExpiresAt = new Date(Date.now() + 3600000);

    await this.tokenRepository.save({
      userId: user.id,
      token: token,
      expiresAt: tokenExpiresAt,
      type: "reset-password",
    });

    const resetMessage = `Your password reset token is ${token}. The token will expire in 1 hour.`;

    await this.sendMail({
      to: user.email,
      subject: "Password Reset Request",
      text: resetMessage,
    });

    return true;
  }
}

module.exports = RequestResetPasswordUseCase;
