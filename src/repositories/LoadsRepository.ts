import {
  EntityRepository,
  getCustomRepository,
  getRepository,
  Repository,
} from 'typeorm';

import Load from '../models/Load';
import CompaniesRepository from './CompaniesRepository';
import FarmsRepository from './FarmsRepository';

interface CreateLoadDTO {
  date: string;
  company_id: string;
  farm_id: string;
  weight?: number;
  value?: number;
  type: 'truck' | 'bitruck' | 'carretinha';
}

@EntityRepository(Load)
class LoadsRepository extends Repository<Load> {
  public async findAll(): Promise<Load[]> {
    const loadsRepository = getRepository(Load);

    const loads = await loadsRepository.find({
      select: ['id', 'company_id', 'farm_id', 'date', 'weight', 'value'],
    });

    return loads;
  }

  public async add({
    date,
    company_id,
    farm_id,
    weight,
    value,
    type,
  }: CreateLoadDTO): Promise<Load> {
    const loadsRepository = getCustomRepository(LoadsRepository);
    const farmsRepository = getCustomRepository(FarmsRepository);
    const companiesRepository = getCustomRepository(CompaniesRepository);

    const checkFarmExists = await farmsRepository.findOne({
      where: { id: farm_id },
    });

    const checkCompanyExists = await companiesRepository.findOne({
      where: { id: farm_id },
    });

    if (!checkFarmExists && !checkCompanyExists) {
      throw new Error('This owner is not registered.');
    }

    const load = loadsRepository.create({
      date,
      company_id,
      farm_id,
      weight,
      value,
      type,
    });

    await loadsRepository.save(load);

    return load;
  }
}

export default LoadsRepository;
