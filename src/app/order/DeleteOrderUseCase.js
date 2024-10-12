const { NotFoundError, ForbiddenError } = require("../../errors");

class DeleteOrderUseCase {
  constructor(orderRepositoryImpl) {
    this.orderRepository = orderRepositoryImpl;
  }

  async execute(orderId, merchantId) {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new NotFoundError("Order not found");
    }

    if (!order.verifyUser(merchantId)) {
      throw new ForbiddenError("Forbidden");
    }

    return await this.orderRepository.delete(orderId);
  }
}

module.exports = DeleteOrderUseCase;
