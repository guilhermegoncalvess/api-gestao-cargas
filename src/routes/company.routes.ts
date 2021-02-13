import { Router } from 'express';

import CompaniesRepository from '../repositories/CompaniesRepository';

const companyRouter = Router();
const companiesRepository = new CompaniesRepository();

companyRouter.post('/', async (request, response) => {
  const { name, address, contact, owner_id } = request.body;

  const company = await companiesRepository.createCompany({
    name,
    address,
    contact,
    owner_id,
  });

  return response.json(company);
});

companyRouter.get('/', async (request, response) => {
  const companies = await companiesRepository.all();

  return response.json(companies);
});

export default companyRouter;
