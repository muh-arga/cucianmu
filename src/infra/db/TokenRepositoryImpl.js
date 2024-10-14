const Token = require("../../domain/token/Token");
const TokenRepository = require("../../domain/token/TokenRepository");

class TokenRepositoryImpl extends TokenRepository {
  constructor(prisma) {
    super();
    this.prisma = prisma;
  }

  async findById(id) {
    const token = await this.prisma.token.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    return token
      ? new Token(
          token.id,
          token.userId,
          token.user,
          token.token,
          token.expiresAt,
          token.type,
          token.createdAt,
          token.updatedAt
        )
      : null;
  }

  async findByUserId(userId, type) {
    const token = await this.prisma.token.findFirst({
      where: {
        userId,
        type,
      },
      include: {
        user: true,
      },
    });

    return token
      ? new Token(
          token.id,
          token.userId,
          token.user,
          token.token,
          token.expiresAt,
          token.type,
          token.createdAt,
          token.updatedAt
        )
      : null;
  }

  async findByToken(token) {
    const tokenData = await this.prisma.token.findFirst({
      where: {
        token,
      },
      include: {
        user: true,
      },
    });

    return tokenData
      ? new Token(
          tokenData.id,
          tokenData.userId,
          tokenData.user,
          tokenData.token,
          tokenData.expiresAt,
          tokenData.type,
          tokenData.createdAt,
          tokenData.updatedAt
        )
      : null;
  }

  async save(data) {
    const newToken = await this.prisma.token.create({
      data: {
        userId: data.userId,
        token: data.token,
        expiresAt: data.expiresAt,
        type: data.type,
      },
      include: {
        user: true,
      },
    });

    return new Token(
      newToken.id,
      newToken.userId,
      newToken.user,
      newToken.token,
      newToken.expiresAt,
      newToken.type,
      newToken.createdAt,
      newToken.updatedAt
    );
  }

  async delete(id) {
    await this.prisma.token.delete({
      where: {
        id,
      },
    });
  }
}

module.exports = TokenRepositoryImpl;
