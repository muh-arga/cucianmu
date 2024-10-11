const { NotFoundError, ForbiddenError } = require("../../errors")

class UpdateServiceUseCase {
  constructor(serviceRepositoryImpl) {
    this.serviceRepository = serviceRepositoryImpl
  }

  async execute(id, userId, data) {
    const service = await this.serviceRepository.findById(id)

    if (!service) {
      throw new NotFoundError('Service not found')
    }

    if(!service.verifyUser(userId)) {
      throw new ForbiddenError('Forbidden', 403)
    }

    const updatedService = await this.serviceRepository.update(id, data)
    return updatedService
  }
}

module.exports = UpdateServiceUseCase
