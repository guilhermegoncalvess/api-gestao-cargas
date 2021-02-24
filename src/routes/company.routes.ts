import { Router } from 'express';

import CompaniesRepository from '../repositories/CompaniesRepository';

const companyRouter = Router();
const companiesRepository = new CompaniesRepository();

companyRouter.get('/', async (request, response) => {
  const companies = await companiesRepository.findAll();

  return response.json(companies);
});

companyRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const companies = await companiesRepository.findById(id);

  return response.json(companies[0]);
});

companyRouter.post('/', async (request, response) => {
  const { name, address, contact, owner_id } = request.body;

  try {
    const company = await companiesRepository.add({
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

companyRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { name, address, contact, owner_id } = request.body;
  try {
    const company = await companiesRepository.alter({
      id,
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
