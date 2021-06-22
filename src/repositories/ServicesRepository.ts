import {
  EntityRepository,
  getCustomRepository,
  getRepository,
  Repository,
} from 'typeorm';
import AppError from '../errors/AppError';

import Service from '../models/Service';

interface CreateRepositoryDTO {
  employees_id: string[];
  load_id: string;
  farm_id: string;
  date: Date;
}

@EntityRepository(Service)
class ServicesRepository extends Repository<Service> {
  public async findAll(): Promise<Service[]> {
    const servicesRepository = getRepository(Service);

    const services = await servicesRepository.find({
      select: ['load_id', 'farm_id', 'employee_id','date'],
    });

    if (!services) {
      throw new AppError('Services not found.', 404);
    }

    return services;
  }

  public async findEmployeeByLoad(load: string): Promise<Service[]> {
    const servicesRepository = getRepository(Service);

    const service = await servicesRepository.find({
      select: ['employee_id'],

      where: { load_id: load },
    });

    if (!service) {
      throw new AppError('Service does not exist.', 404);
    }

    return service;
  }

  public async add({
    employees_id,
    load_id,
    farm_id,
    date
  }: CreateRepositoryDTO): Promise<Service[]> {
    const servicesRepository = getCustomRepository(ServicesRepository);

    const service = servicesRepository.create(
      employees_id.map(employee_id => ({
        employee_id,
        load_id,
        farm_id,
        date
      })),
    );

    await servicesRepository.save(service);

    return service;
  }
}

export default ServicesRepository;
