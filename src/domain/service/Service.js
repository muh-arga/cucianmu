class Service {
  constructor(id, merchantId, name, type, price, estimate = null, ironed = null, merchant) {
    this.id = id
    this.merchantId = merchantId
    this.name = name
    this.type = type
    this.price = price
    this.estimate = estimate
    this.ironed = ironed
    this.merchant = merchant
  }

  verifyUser(id) {
    return this.merchantId === id
  }
}

module.exports = Service
