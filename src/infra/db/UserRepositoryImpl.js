const prisma = require("./prisma/prismaClient");
const UserRepository = require("../../domain/user/UserRepository");
const User = require("../../domain/user/User");

class UserRepositoryImpl extends UserRepository {
  constructor(prisma) {
    super();
    this.prisma = prisma;
  }

  async findById(id) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user
      ? new User(
          user.id,
          user.email,
          user.name,
          user.password,
          user.phone,
          user.address,
          user.image
        )
      : null;
  }

  async findByEmail(email) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user
      ? new User(
          user.id,
          user.email,
          user.name,
          user.password,
          user.phone,
          user.address,
          user.image
        )
      : null;
  }

  async findAll() {
    const users = await prisma.user.findMany();
    return users.map(
      (user) =>
        new User(
          user.id,
          user.email,
          user.name,
          user.password,
          user.phone,
          user.address,
          user.image
        )
    );
  }

  async save(user) {
    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
        phone: user.phone,
        address: user.address,
      },
    });

    return new User(
      newUser.id,
      newUser.email,
      newUser.name,
      newUser.password,
      newUser.phone,
      newUser.address
    );
  }

  async update(id, data) {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        phone: data.phone,
        address: data.address,
        image: data.image,
      }
    });

    return new User(
      updatedUser.id,
      updatedUser.email,
      updatedUser.name,
      updatedUser.password,
      updatedUser.phone,
      updatedUser.address,
      updatedUser.image
    );
  }
}

module.exports = UserRepositoryImpl;
