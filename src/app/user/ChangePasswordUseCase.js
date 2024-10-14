const User = require("../../domain/user/User");
const { NotFoundError, BadRequestError } = require("../../errors");

class ChangePasswordUseCase {
  constructor(userRepositoryImpl, bcrypt) {
    this.userRepository = userRepositoryImpl;
    this.bcrypt = bcrypt;
  }

  async execute(id, data) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    if(!user.verifyPassword(data.password, this.bcrypt)){
      throw new BadRequestError("Invalid password");
    }

    const hashedPassword = await User.hashPassword(data.newPassword, this.bcrypt);

    const updatedUser = await this.userRepository.update(id, {password: hashedPassword});

    return updatedUser;
  }
}

module.exports = ChangePasswordUseCase;
