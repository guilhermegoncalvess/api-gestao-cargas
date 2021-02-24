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
  public async findAll(): Promise<Service[]> {
    const servicesRepository = getRepository(Service);

    const services = await servicesRepository.find({
      select: ['load_id', 'employee_id'],
    });

    return services;
  }

  public async findEmployeeByLoad(load: string): Promise<Service[]> {
    const servicesRepository = getRepository(Service);

    const service = await servicesRepository.find({
      select: ['employee_id'],

      where: { load_id: load },
    });

    if (!service) {
      throw new Error('Service does not exist.');
    }

    return service;
  }

  public async add({
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
}

export default ServicesRepository;
