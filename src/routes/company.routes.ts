import { Router } from 'express';

import CompaniesRepository from '../repositories/CompaniesRepository';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const companyRouter = Router();
const companiesRepository = new CompaniesRepository();

companyRouter.use(ensureAuthenticated);

companyRouter.get('/', async (request, response) => {
  try {
    const companies = await companiesRepository.findAll();

    return response.json(companies);
  } catch (err) {
    return response
      .status(400)
      .json({ message: 'Nenhuma empresa foi encontrada.' });
  }
});

companyRouter.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const companies = await companiesRepository.findById(id);

    return response.json(companies[0]);

  }catch (err) {
    return response
      .status(400)
      .json({ message: 'Nenhuma empresa foi encontrada.' });
  }
});

companyRouter.post('/', async (request, response) => {
  try {
    const { name, address, city, state, contact, owner_id } = request.body;

    const company = await companiesRepository.add({
      name,
      address,
      city,
      state,
      contact,
      owner_id,
    });

    return response.json(company);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

companyRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { name, address, city, state, contact, owner_id } = request.body;

    const company = await companiesRepository.alter({
      id,
      name,
      address,
      city,
      state,
      contact,
      owner_id,
    });

    return response.json(company);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

companyRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    await companiesRepository.deleteCompany(id);

    return response.json({ status: 'Empresa exluída com sucesso!' });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default companyRouter;
