class Service {
  constructor(id, userId, name, type, price, estimate = null, ironed = null, user) {
    this.id = id
    this.userId = userId
    this.name = name
    this.type = type
    this.price = price
    this.estimate = estimate
    this.ironed = ironed
    this.user = user
  }

  verifyUser(id) {
    return this.userId === id
  }
}

module.exports = Service
