import {
  EntityRepository,
  getCustomRepository,
  getRepository,
  Repository,
} from 'typeorm';

import AppError from '../errors/AppError';

import Load from '../models/Load';
import CompaniesRepository from './CompaniesRepository';
import FarmsRepository from './FarmsRepository';

interface CreateLoadDTO {
  company_id: string;
  weight?: number;
  cost?: number;
  type: string;
  description?: string;
  status: string;
  start_date: string;
  finished_date?: string;
}

@EntityRepository(Load)
class LoadsRepository extends Repository<Load> {
  public async findAll(): Promise<Load[]> {
    const loadsRepository = getRepository(Load);

    const loads = await loadsRepository.find({
      select: ['id', 'weight', 'cost', 'status', 'start_date', 'finished_date'],
      // relations: ['company'],
    });

    if (!loads) {
      throw new AppError('Loads not found.', 404);
    }

    return loads;
  }

  public async add({
    company_id,
    weight,
    cost,
    type,
    description,
    status,
    start_date,
    finished_date,

  }: CreateLoadDTO): Promise<Load> {
    const loadsRepository = getCustomRepository(LoadsRepository);
    const farmsRepository = getCustomRepository(FarmsRepository);
    const companiesRepository = getCustomRepository(CompaniesRepository);

    const checkCompanyExists = await companiesRepository.findOne({
      where: { id: company_id },
    });

    if (!checkCompanyExists) {
      throw new AppError('This owner is not registered.', 404);
    }

    const load = loadsRepository.create({
      company_id,
      weight,
      cost,
      type,
      description,
      status,
      start_date,
      finished_date
    });

    await loadsRepository.save(load);

    return load;
  }
}

export default LoadsRepository;
