class GetOrderByIdUseCase {
  constructor(orderRepositoryImpl) {
    this.orderRepository = orderRepositoryImpl;
  }

  async execute(orderId) {
    const order = await this.orderRepository.findById(orderId);
    return order;
  }
}

module.exports = GetOrderByIdUseCase;
