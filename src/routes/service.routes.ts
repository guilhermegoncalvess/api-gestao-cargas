import { Router } from 'express';

import ServicesRepository from '../repositories/ServicesRepository';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const serviceRouter = Router();
const servicesRepository = new ServicesRepository();

serviceRouter.use(ensureAuthenticated);

serviceRouter.get('/', async (request, response) => {
  try {
    const service = await servicesRepository.findAll();

    return response.json(service);

  } catch (err) {
    return response
      .status(400)
      .json({ message: 'Nenhum serviço foi encontrada.' });
  }
});

serviceRouter.get('/:load', async (request, response) => {
  const { load } = request.params;
  console.log(load);
  try {
    const service = await servicesRepository.findEmployeeByLoad(load);

    return response.json(service);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

serviceRouter.post('/', async (request, response) => {
  const { employees_id, load_id } = request.body;

  const service = await servicesRepository.add({
    employees_id,
    load_id,
  });

  return response.json(service);
});

export default serviceRouter;
