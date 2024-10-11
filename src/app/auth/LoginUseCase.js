const { BadRequestError } = require("../../errors");

class LoginUseCase {
  constructor(userRepositoryImpl, bcrypt, jwt, secret) {
    this.userRepository = userRepositoryImpl;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
    this.secret = secret;
  }

  async execute(email, password) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestError("Invalid email or password");
    }

    if (!user.verifyPassword(password, this.bcrypt)) {
      throw new BadRequestError("Invalid email or password");
    }

    return user.generateToken(this.jwt, this.secret);
  }
}

module.exports = LoginUseCase;
