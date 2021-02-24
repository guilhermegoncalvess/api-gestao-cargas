import { Router } from 'express';

import CompaniesRepository from '../repositories/CompaniesRepository';

const companyRouter = Router();
const companiesRepository = new CompaniesRepository();

companyRouter.post('/', async (request, response) => {
  const { name, address, contact, owner_id } = request.body;

  try {
    const company = await companiesRepository.createCompany({
      name,
      address,
      contact,
      owner_id,
    });

    return response.json(company);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

companyRouter.get('/', async (request, response) => {
  const companies = await companiesRepository.all();

  return response.json(companies);
});

// companyRouter.get('/:id', async (request, response) => {
//   const companies = await companiesRepository.all();

//   return response.json(companies);
// });

companyRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  try {
    await companiesRepository.deleteCompany(id);

    return response.json({ status: 'Empresa exluída com sucesso!' });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default companyRouter;
