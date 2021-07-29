import {
  getCustomRepository,
  Repository,
  EntityRepository,
  getRepository,
} from 'typeorm';
import AppError from '../errors/AppError';

import Company from '../models/Company';

interface CreateCompanyDTO {
  id?: string;
  cnpj: string;
  name: string;
  address: string;
  city?: string;
  state?: string;
  contact: string;
  status: string;
}

@EntityRepository(Company)
class CompaniesRepository extends Repository<Company> {
  public async findAll(): Promise<Company[]> {
    const companiesRepository = getRepository(Company);

    const companies = await companiesRepository.find({
      select: ['id', 'cnpj', 'name', 'address', 'contact'],
    });

    if (!companies) {
      throw new AppError('Companies not found.', 404);
    }

    return companies;
  }

  public async findById(id: string): Promise<Company[]> {
    const companiesRepository = getRepository(Company);

    const company = await companiesRepository.find({
      select: ['name', 'cnpj', 'address', 'contact'],
      where: { id },
    });

    if (!company) {
      throw new AppError('Company does not exist.', 404);
    }

    return company;
  }


  //corrigir esse método

  public async add({
    name,
    cnpj,
    address,
    city,
    state,
    contact,
    status
  }: CreateCompanyDTO): Promise<Company> {
    const companiesRepository = getCustomRepository(CompaniesRepository);

    const company = companiesRepository.create({
      name,
      cnpj,
      address,
      city,
      state,
      contact,
      status
    });

    await companiesRepository.save(company);

    return company;
  }



  public async alter({
    id,
    cnpj,
    name,
    address,
    city,
    state,
    contact,
    status
  }: CreateCompanyDTO): Promise<Company> {
    const companiesRepository = getRepository(Company);
    const company = await companiesRepository.findOne(id);

    if (!company) {
      throw new AppError('company does not exist.', 404);
    }

    if (name) company.name = name;
    if (cnpj) company.cnpj = cnpj;
    if (address) company.address = address;
    if (city) company.city = city;
    if (state) company.state = state;
    if (contact) company.contact = contact;
    if (status) company.status = status;

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
