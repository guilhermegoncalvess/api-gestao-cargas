import {
  EntityRepository,
  getCustomRepository,
  getRepository,
  Repository,
} from 'typeorm';
import AppError from '../errors/AppError';

import Farm from '../models/Farm';

interface CreateFarmDTO {
  id?: string;
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  owner: string;
}

@EntityRepository(Farm)
class FarmsRepository extends Repository<Farm> {
  public async findAll(): Promise<Farm[]> {
    const farmsRepository = getRepository(Farm);

    const farms = await farmsRepository.find({
      select: ['id', 'name', 'city', 'state'],
    });

    if (!farms) {
      throw new AppError('Farms not found.', 404);
    }

    return farms;
  }

  public async findById(id: string): Promise<Farm[]> {
    const farmsRepository = getRepository(Farm);

    const farm = await farmsRepository.find({
      select: ['name', 'city', 'state'],
      where: { id },
    });

    if (!farm) {
      throw new AppError('Farm does not exist.', 404);
    }

    return farm;
  }

  public async add({
    name,
    address,
    city,
    state,
    contact,
    owner,
  }: CreateFarmDTO): Promise<Farm> {
    const farmsRepository = getCustomRepository(FarmsRepository);

    const farm = farmsRepository.create({
      name,
      city,
      address,
      state,
      contact,
      owner,
    });

    await farmsRepository.save(farm);

    return farm;

  }

  public async alter({
    id,
    address,
    name,
    city,
    state,
    contact,
    owner,
  }: CreateFarmDTO): Promise<Farm> {
    const farmsRepository = getRepository(Farm);
    const farm = await farmsRepository.findOne(id);

    if (!farm) {
      throw new AppError('farm does not exist.', 404);
    }

    if (name) farm.name = name;
    if (address) farm.address = address;
    if (city) farm.city = city;
    if (state) farm.state = state;
    if (contact) farm.contact = contact;
    if (owner) farm.owner = owner;

    await farmsRepository.save(farm);

    return farm;
  }

  public async deleteFarm(id: string): Promise<void> {
    const farmsRepository = getRepository(Farm);

    const farm = await farmsRepository.findOne(id);

    if (!farm) {
      throw new AppError('Farm does not exist.', 404);
    }

    await farmsRepository.remove(farm);
  }
}

export default FarmsRepository;
