const { registerSchema, updateSchema } = require("../validators/AuthValidator");
const fs = require("fs");
const path = require("path");

class AuthController {
  constructor(loginUseCase, registerUserUseCase, updateUserUseCase) {
    this.loginUseCase = loginUseCase;
    this.registerUserUseCase = registerUserUseCase;
    this.updateUserUseCase = updateUserUseCase;
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const token = await this.loginUseCase.execute(email, password);
      return res.status(200).json({
        message: "User logged in successfully",
        data: {
          access_token: token,
        },
      });
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }

  async register(req, res) {
    const data = req.body;

    // validate
    const { error } = registerSchema.validate(data);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    try {
      const token = await this.registerUserUseCase.execute(data);
      return res.status(201).json({
        message: "User registered successfully",
        data: {
          access_token: token,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  }

  async getLoggedInUser(req, res) {
    const image = req.user.image;
    const imageUrl = image
      ? `${req.protocol}://${req.get("host")}/uploads/${image}`
      : null;

    req.user = { ...req.user, image: imageUrl };

    return res.status(200).json({
      message: "User information retrivied successfully",
      data: req.user,
    });
  }

  async updateProfile(req, res) {
    const data = req.body;
    const { id } = req.user;
    const image = req.file ? req.file.filename : null;

    // validate
    const { error } = updateSchema.validate(data);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    try {
      data.image = image;
      let user = await this.updateUserUseCase.getUserById(id);

      // Delete old image if exists
      if (image && user.image) {
        const oldImage = path.join(
          __dirname,
          `../../public/uploads/${user.image}`
        );
        await fs.unlink(oldImage, (err) => {
          if (err) {
            return res.status(400).json({ message: err.message });
          }
        });
      }

      user = await this.updateUserUseCase.execute(id, data);

      const imageUrl = image
        ? `${req.protocol}://${req.get("host")}/uploads/${image}`
        : null;

      user = { ...user, image: imageUrl };

      return res.status(200).json({
        message: "User updated successfully",
        data: user,
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async logout(req, res) {
    try {
      return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = AuthController;
