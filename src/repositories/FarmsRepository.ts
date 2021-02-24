import {
  EntityRepository,
  getCustomRepository,
  getRepository,
  Repository,
} from 'typeorm';

import Farm from '../models/Farm';
import PersonRepository from './PersonsRepository';

interface CreateFarmDTO {
  id?: string;
  name: string;
  city: string;
  state: string;
  owner_id: string;
}

@EntityRepository(Farm)
class FarmsRepository extends Repository<Farm> {
  public async findAll(): Promise<Farm[]> {
    const farmsRepository = getRepository(Farm);

    const farms = await farmsRepository.find({
      select: ['id', 'name', 'city', 'state'],
      relations: ['owner'],
    });

    return farms;
  }

  public async findById(id: string): Promise<Farm[]> {
    const farmsRepository = getRepository(Farm);

    const farm = await farmsRepository.find({
      select: ['name', 'city', 'state'],
      relations: ['owner'],
      where: { id },
    });

    if (!farm) {
      throw new Error('Farm does not exist.');
    }

    return farm;
  }

  public async add({
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

  public async alter({
    id,
    name,
    city,
    state,
    owner_id,
  }: CreateFarmDTO): Promise<Farm> {
    const farmsRepository = getRepository(Farm);
    const farm = await farmsRepository.findOne(id);

    if (!farm) {
      throw new Error('farm does not exist.');
    }

    if (name) farm.name = name;
    if (city) farm.city = city;
    if (state) farm.state = state;
    if (owner_id) farm.owner_id = owner_id;

    await farmsRepository.save(farm);

    return farm;
  }

  public async deleteFarm(id: string): Promise<void> {
    const farmsRepository = getRepository(Farm);

    const farm = await farmsRepository.findOne(id);

    if (!farm) {
      throw new Error('Farm does not exist.');
    }

    await farmsRepository.remove(farm);
  }
}

export default FarmsRepository;
