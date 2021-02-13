import {
  EntityRepository,
  getCustomRepository,
  getRepository,
  Repository,
} from 'typeorm';
import Load from '../models/Load';

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
  public async createLoad({
    date,
    company_id,
    farm_id,
    weight,
    value,
    type,
  }: CreateLoadDTO): Promise<Load> {
    const loadsRepository = getCustomRepository(LoadsRepository);
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

  public async all(): Promise<Load[]> {
    const loadsRepository = getRepository(Load);

    const loads = await loadsRepository.find({
      select: ['id', 'company_id', 'farm_id', 'date', 'weight', 'value'],
    });

    return loads;
  }
}

export default LoadsRepository;
