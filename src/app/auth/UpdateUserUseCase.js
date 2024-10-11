const { NotFoundError } = require("../../errors");

class UpdateUserUseCase {
  constructor(userRepositoryImpl) {
    this.userRepository = userRepositoryImpl;
  }

  async execute(id, data) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const updatedUser = await this.userRepository.update(id, data);

    return updatedUser;
  }

  async getUserById(id) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }
}

module.exports = UpdateUserUseCase;
