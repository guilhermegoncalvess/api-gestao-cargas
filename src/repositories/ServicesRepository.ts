import {
  EntityRepository,
  getCustomRepository,
  getRepository,
  Repository,
} from 'typeorm';

import Service from '../models/Service';

interface CreateRepositoryDTO {
  employees_id: string[];
  load_id: string;
}

@EntityRepository(Service)
class ServicesRepository extends Repository<Service> {
  public async createService({
    employees_id,
    load_id,
  }: CreateRepositoryDTO): Promise<Service[]> {
    const servicesRepository = getCustomRepository(ServicesRepository);

    const service = servicesRepository.create(
      employees_id.map(employee_id => ({
        employee_id,
        load_id,
      })),
    );

    await servicesRepository.save(service);

    return service;
  }

  public async all(): Promise<Service[]> {
    const servicesRepository = getRepository(Service);

    const services = await servicesRepository.find({
      select: ['load_id', 'employee_id'],
    });

    return services;
  }
}

export default ServicesRepository;
