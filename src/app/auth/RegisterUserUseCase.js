const User = require("../../domain/user/User");
const { BadRequestError } = require("../../errors");

class RegisterUserUseCase {
  constructor(userRepositoryImpl, bcrypt, jwt, secret) {
    this.userRepository = userRepositoryImpl;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
    this.secret = secret;
  }

  async execute(data) {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if(existingUser){
      throw new BadRequestError("User with this email already exists");
    }

    const hashedPassword = await User.hashPassword(data.password, this.bcrypt);
  
    data.password = hashedPassword;

    const user = await this.userRepository.save(data);

    return user.generateToken(this.jwt, this.secret);
  }
}

module.exports = RegisterUserUseCase;
