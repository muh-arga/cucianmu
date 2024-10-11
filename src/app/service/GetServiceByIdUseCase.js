const { NotFoundError } = require("../../errors")

class GetServiceByIdUseCase {
  constructor(serviceRepositoryImpl) {
    this.serviceRepository = serviceRepositoryImpl
  }

  async execute(id) {
    const service = await this.serviceRepository.findById(id)

    if(!service) {
      throw new NotFoundError('Service not found')
    }

    return await this.serviceRepository.findById(id)
  }
}

module.exports = GetServiceByIdUseCase
