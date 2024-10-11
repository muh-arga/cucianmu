const User = require("../../domain/user/User");
const UserRepositoryImpl = require("../../infra/db/UserRepositoryImpl");

class UserService {
  constructor() {
    this.userRepository = new UserRepositoryImpl();
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findById(id) {
    const userData = await this.userRepository.findById(id);
    if (!userData) {
      throw new Error("User not found");
    }

    return userData;
  }
}

module.exports = UserService;
