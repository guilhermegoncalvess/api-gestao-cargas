import Company from '../models/Company';

interface CreateCompanyDTO {
  name: string;
  address: string;
  contact: string;
  owner: string;
}

class CompaniesRepository {
  private companies: Company[];

  constructor() {
    this.companies = [];
  }

  public all(): Company[] {
    return this.companies;
  }

  public create({ name, address, contact, owner }: CreateCompanyDTO): Company {
    const company = new Company({
      name,
      address,
      contact,
      owner,
    });

    this.companies.push(company);

    return company;
  }
}

export default CompaniesRepository;
