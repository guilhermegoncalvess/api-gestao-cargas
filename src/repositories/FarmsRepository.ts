import {
  EntityRepository,
  getCustomRepository,
  getRepository,
  Repository,
} from 'typeorm';
import Farm from '../models/Farm';

interface CreateFarmDTO {
  name: string;
  city: string;
  state: string;
  owner_id: string;
}

@EntityRepository(Farm)
class FarmsRepository extends Repository<Farm> {
  public async createFarm({
    name,
    city,
    state,
    owner_id,
  }: CreateFarmDTO): Promise<Farm> {
    const farmsRepository = getCustomRepository(FarmsRepository);
    const farm = farmsRepository.create({
      name,
      city,
      state,
      owner_id,
    });

    await farmsRepository.save(farm);

    return farm;
  }

  public async all(): Promise<Farm[]> {
    const farmsRepository = getRepository(Farm);

    const farms = await farmsRepository.find({
      select: ['id', 'owner_id', 'name', 'city', 'state'],
      relations: ['owner'],
    });

    return farms;
  }
}

export default FarmsRepository;
