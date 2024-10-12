const { NotFoundError, ForbiddenError } = require("../../errors");

class UpdateOrderUseCase {
  constructor(orderRepositoryImpl) {
    this.orderRepository = orderRepositoryImpl;
  }

  async execute(orderId, merchantId, orderData) {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new NotFoundError("Order not found");
    }

    if (!order.verifyUser(merchantId)) {
      throw new ForbiddenError("Forbidden");
    }

    const estDone = new Date(orderData.estDone);
    orderData.estDone = estDone.toISOString();

    if(orderData.paid) {
      orderData.returned = orderData.paid - order.total;
    }

    const updatedOrder = await this.orderRepository.update(orderId, orderData);
    return updatedOrder;
  }
}

module.exports = UpdateOrderUseCase;
