class User {
  constructor(id, email, name, password, phone, address, image = null) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.address = address;
    this.image = image;
  }

  verifyPassword(password, bcrypt) {
    return bcrypt.compareSync(password, this.password);
  }

  generateToken(jwt, secret) {
    return jwt.sign(
      {
        id: this.id,
        email: this.email,
        address: this.address,
        phone: this.phone,
        image: this.image ?? null,
      },
      secret,
      {
        expiresIn: "1h",
      }
    );
  }

  static async hashPassword(password, bcrypt) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}

module.exports = User;
