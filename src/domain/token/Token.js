class Token {
  constructor(id, userId, user, token, expiresAt, type, createdAt, updatedAt) {
    this.id = id;
    this.userId = userId;
    this.user = user;
    this.token = token;
    this.expiresAt = expiresAt;
    this.type = type;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Token;
