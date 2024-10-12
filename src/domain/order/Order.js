class Order {
  constructor(
    id,
    number,
    status,
    merchantId,
    customerName = null,
    customerPhone = null,
    estDone = null,
    doneAt = null,
    paymentStatus = null,
    paymentMethod = null,
    total = null,
    paid = null,
    retuned = null,
    items = [],
    createdAt,
    updatedAt = null
  ) {
    this.id = id;
    this.number = number;
    this.status = status;
    this.merchantId = merchantId;
    this.customerName = customerName;
    this.customerPhone = customerPhone;
    this.estDone = estDone;
    this.doneAt = doneAt;
    this.paymentStatus = paymentStatus;
    this.paymentMethod = paymentMethod;
    this.total = total;
    this.paid = paid;
    this.retuned = retuned;
    this.items = items;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  verifyUser(id) {
    return this.merchantId === id;
  }

  updateStatus() {
    this.status += 1;
  }
}

module.exports = Order;
