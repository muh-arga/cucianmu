class Item {
  constructor(id, orderId, type, serviceId, amount = null, total = null, service, ceratedAt, updatedAt = null) {
    this.id = id;
    this.orderId = orderId;
    this.type = type;
    this.serviceId = serviceId;
    this.amount = amount;
    this.total = total;
    this.service = service;
    this.ceratedAt = ceratedAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Item;
