import {
  getCustomRepository,
  Repository,
  EntityRepository,
  getRepository,
} from 'typeorm';

import Company from '../models/Company';
import PersonsRepository from './PersonsRepository';

interface CreateCompanyDTO {
  name: string;
  address: string;
  contact: string;
  owner_id: string;
}

@EntityRepository(Company)
class CompaniesRepository extends Repository<Company> {
  public async createCompany({
    name,
    address,
    contact,
    owner_id,
  }: CreateCompanyDTO): Promise<Company> {
    const companiesRepository = getCustomRepository(CompaniesRepository);
    const personRepository = getCustomRepository(PersonsRepository);

    const checkOwnerExists = await personRepository.findOne({
      where: { id: owner_id },
    });

    if (!checkOwnerExists) {
      throw new Error('This owner is not registered.');
    }

    const company = companiesRepository.create({
      name,
      address,
      contact,
      owner_id,
    });

    await companiesRepository.save(company);

    return company;
  }

  public async all(): Promise<Company[]> {
    const companiesRepository = getRepository(Company);

    const companies = await companiesRepository.find({
      select: ['id', 'name', 'address', 'contact'],
      relations: ['owner'],
    });

    return companies;
  }

  public async deleteCompany(id: string): Promise<void> {
    const companiesRepository = getRepository(Company);

    const company = await companiesRepository.findOne(id);

    if (!company) {
      throw new Error('Company does not exist.');
    }

    await companiesRepository.remove(company);
  }
}

export default CompaniesRepository;
