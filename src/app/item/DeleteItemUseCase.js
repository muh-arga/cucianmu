const { NotFoundError, ForbiddenError } = require("../../errors");

class DeleteItemUseCase {
  constructor(itemRepositoryImpl, orderRepositoryImpl) {
    this.itemRepository = itemRepositoryImpl;
    this.orderRepository = orderRepositoryImpl;
  }

  async execute(itemId, merchantId) {
    const item = await this.itemRepository.findById(itemId);
    if (!item) {
      throw new NotFoundError("Item not found");
    }

    const order = await this.orderRepository.findById(item.orderId);
    if (!order) {
      throw new NotFoundError("Order not found");
    }

    if (!order.verifyUser(merchantId)) {
      throw new ForbiddenError("Forbidden");
    }

    const orderTotal = order.total - item.total;

    await this.itemRepository.delete(itemId);
    await this.orderRepository.update(order.id, { total: orderTotal });

    return true;
  }
}

module.exports = DeleteItemUseCase;
