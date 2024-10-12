const { addItemSchema } = require("../validators/ItemValidator");

class ItemController {
  constructor(addItemUseCase, deleteItemUseCase) {
    this.addItemUseCase = addItemUseCase;
    this.deleteItemUseCase = deleteItemUseCase;
  }

  async addItem(req, res, next) {
    const data = req.body;
    const merchantId = req.user.id;

    const { error } = addItemSchema.validate(data);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    try {
      const item = await this.addItemUseCase.execute(data, merchantId);
      return res.status(201).json({
        message: "Item added successfully",
        data: item,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteItem(req, res, next) {
    const { itemId } = req.params;
    const merchantId = req.user.id;

    try {
      await this.deleteItemUseCase.execute(itemId, merchantId);
      return res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ItemController;
