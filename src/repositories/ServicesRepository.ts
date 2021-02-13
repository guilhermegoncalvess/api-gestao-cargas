import {
  EntityRepository,
  getCustomRepository,
  getRepository,
  Repository,
} from 'typeorm';
import Service from '../models/Service';

interface CreateRepositoryDTO {
  employee_id: string;
  load_id: string;
}

@EntityRepository(Service)
class ServicesRepository extends Repository<Service> {
  public async createService({
    employee_id,
    load_id,
  }: CreateRepositoryDTO): Promise<Service> {
    const servicesRepository = getCustomRepository(ServicesRepository);
    const service = servicesRepository.create({
      employee_id,
      load_id,
    });

    await servicesRepository.save(service);

    return service;
  }

  public async all(): Promise<Service[]> {
    const servicesRepository = getRepository(Service);

    const services = await servicesRepository.find({
      select: ['id', 'load_id', 'employee_id'],
    });

    return services;
  }
}

export default ServicesRepository;
