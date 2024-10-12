const { json } = require("express");

class TrackOrderUseCase {
  constructor(orderRepositoryImpl) {
    this.orderRepository = orderRepositoryImpl;
  }

  async execute(data) {
    let tracked = [];
    const orders = JSON.parse(data.orders);

    for (const number of orders) {
      const order = await this.orderRepository.findByNumber(number);
      if (!order) {
        tracked.push({ number: number });
      } else {
        tracked.push(order);
      }
    }
    return tracked;
  }
}

module.exports = TrackOrderUseCase;
