class AddServiceUseCase {
  constructor(serviceRepositoryImpl) {
    this.serviceRepository = serviceRepositoryImpl;
  }

  async execute(data) {
    const service = await this.serviceRepository.save(data);
    return service;
  }
}

module.exports = AddServiceUseCase;
