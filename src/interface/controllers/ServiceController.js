const { addServiceSchema } = require("../validators/ServiceValidator");

class ServiceController {
  constructor(
    addServiceUseCase,
    updateServiceUseCase,
    getServiceByUserIdUseCase,
    getServiceByIdUseCase,
    deleteServiceUseCase
  ) {
    this.addServiceUseCase = addServiceUseCase;
    this.updateServiceUseCase = updateServiceUseCase;
    this.getServiceByUserIdUseCase = getServiceByUserIdUseCase;
    this.getServiceByIdUseCase = getServiceByIdUseCase;
    this.deleteServiceUseCase = deleteServiceUseCase;
  }

  async addService(req, res, next) {
    const data = req.body;
    const userId = req.user.id;

    const { error } = addServiceSchema.validate(data);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    try {
      data.userId = userId;
      const service = await this.addServiceUseCase.execute(data);
      return res.status(201).json(service);
    } catch (error) {
      next(error);
    }
  }

  async updateService(req, res, next) {
    const data = req.body;
    const userId = req.user.id;
    const { serviceId } = req.params;

    const { error } = addServiceSchema.validate(data);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    try {
      const service = await this.updateServiceUseCase.execute(
        serviceId,
        userId,
        data
      );
      return res.status(200).json({
        message: "Service updated successfully",
        data: service,
      });
    } catch (error) {
      next(error);
    }
  }

  async getServiceByUserId(req, res, next) {
    const userId = req.user.id;

    try {
      const services = await this.getServiceByUserIdUseCase.execute(userId);
      return res.status(200).json(services);
    } catch (error) {
      next(error);
    }
  }

  async getServiceById(req, res, next) {
    const { serviceId } = req.params;

    try {
      const service = await this.getServiceByIdUseCase.execute(serviceId);
      return res.status(200).json({
        message: "Services retrivied successfully",
        data: service,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteService(req, res, next) {
    const { serviceId } = req.params;
    const userId = req.user.id;

    try {
      const service = await this.deleteServiceUseCase.execute(
        serviceId,
        userId
      );
      return res.status(200).json({
        message: "Service deleted successfully",
        data: service,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ServiceController;
