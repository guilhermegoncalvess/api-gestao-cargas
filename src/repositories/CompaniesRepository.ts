import {
  getCustomRepository,
  Repository,
  EntityRepository,
  getRepository,
} from 'typeorm';
import AppError from '../errors/AppError';

import Company from '../models/Company';
import PersonsRepository from './PersonsRepository';

interface CreateCompanyDTO {
  id?: string;
  name: string;
  address: string;
  city?: string;
  state?: string;
  contact: string;
  owner_id: string;
}

@EntityRepository(Company)
class CompaniesRepository extends Repository<Company> {
  public async findAll(): Promise<Company[]> {
    const companiesRepository = getRepository(Company);

    const companies = await companiesRepository.find({
      select: ['id', 'name', 'address', 'contact'],
      relations: ['owner'],
    });

    if (!companies) {
      throw new AppError('Companies not found.', 404);
    }

    return companies;
  }

  public async findById(id: string): Promise<Company[]> {
    const companiesRepository = getRepository(Company);

    const company = await companiesRepository.find({
      select: ['name', 'address', 'contact'],
      relations: ['owner'],
      where: { id },
    });

    if (!company) {
      throw new AppError('Company does not exist.', 404);
    }

    return company;
  }

  public async add({
    name,
    address,
    city,
    state,
    contact,
    owner_id,
  }: CreateCompanyDTO): Promise<Company> {
    const companiesRepository = getCustomRepository(CompaniesRepository);
    const personRepository = getCustomRepository(PersonsRepository);

    const checkOwnerExists = await personRepository.findOne({
      where: { id: owner_id },
    });

    if (!checkOwnerExists) {
      throw new AppError('This owner is not registered.', 404);
    }
    else {
      if( checkOwnerExists.role == 'Propietario'){

        const company = companiesRepository.create({
          name,
          address,
          city,
          state,
          contact,
          owner_id,
        });

        await companiesRepository.save(company);

        return company;
      }
      else {
        throw new AppError('This person not is owner.', 404 );
      }
    }
  }

  public async alter({
    id,
    name,
    address,
    city,
    state,
    contact,
    owner_id,
  }: CreateCompanyDTO): Promise<Company> {
    const companiesRepository = getRepository(Company);
    const company = await companiesRepository.findOne(id);

    if (!company) {
      throw new AppError('company does not exist.', 404);
    }

    if (name) company.name = name;
    if (address) company.address = address;
    if (city) company.city = city;
    if (state) company.state = state;
    if (contact) company.contact = contact;
    if (owner_id) company.owner_id = owner_id;

    await companiesRepository.save(company);

    return company;
  }

  public async deleteCompany(id: string): Promise<void> {
    const companiesRepository = getRepository(Company);

    const company = await companiesRepository.findOne(id);

    if (!company) {
      throw new AppError('Company does not exist.', 404);
    }

    await companiesRepository.remove(company);
  }
}

export default CompaniesRepository;
