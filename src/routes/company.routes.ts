import { Router } from 'express';

import CompaniesRepository from '../repositories/CompaniesRepository';
// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const companyRouter = Router();
const companiesRepository = new CompaniesRepository();

// companyRouter.use(ensureAuthenticated);

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
  const { cnpj, name, address, city, state, contact } = request.body;

  const company = await companiesRepository.add({
    name,
    cnpj,
    address,
    city,
    state,
    contact,
  });

  return response.status(201).json(company);
});

companyRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { cnpj, name, address, city, state, contact } = request.body;

  const company = await companiesRepository.alter({
    id,
    name,
    cnpj,
    address,
    city,
    state,
    contact,
  });

  return response.json(company);
});

companyRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  await companiesRepository.deleteCompany(id);

  return response.json({ status: 'Empresa exluída com sucesso!' });
});

export default companyRouter;
