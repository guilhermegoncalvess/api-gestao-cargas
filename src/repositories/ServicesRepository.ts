import Service from '../models/Service';

interface CreateRepositoryDTO {
  employee: string;
  load: string;
}

class ServicesRepository {
  private services: Service[];

  constructor() {
    this.services = [];
  }

  public all(): Service[] {
    return this.services;
  }

  public create({ employee, load }: CreateRepositoryDTO): Service {
    const service = new Service({
      employee,
      load,
    });

    this.services.push(service);

    return service;
  }
}

export default ServicesRepository;
