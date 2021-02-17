import {
  EntityRepository,
  getCustomRepository,
  getRepository,
  Repository,
} from 'typeorm';

import Farm from '../models/Farm';
import PersonRepository from './PersonsRepository';

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
    const personRepository = getCustomRepository(PersonRepository);

    const checkOwnerExists = await personRepository.findOne({
      where: { id: owner_id },
    });

    if (!checkOwnerExists) {
      throw new Error('This owner is not registered.');
    }

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
