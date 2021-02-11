import { Router } from 'express';

import CompaniesRepository from '../repositories/CompaniesRepository';

const companyRouter = Router();
const companiesRepository = new CompaniesRepository();

companyRouter.post('/', (request, response) => {
  const { name, address, contact, owner } = request.body;

  const company = companiesRepository.create({
    name,
    address,
    contact,
    owner,
  });

  return response.json(company);
});

companyRouter.get('/', (request, response) => {
  const companies = companiesRepository.all();

  return response.json(companies);
});

export default companyRouter;
