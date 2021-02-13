import {
  getCustomRepository,
  Repository,
  EntityRepository,
  getRepository,
} from 'typeorm';
import Company from '../models/Company';

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
}

export default CompaniesRepository;
