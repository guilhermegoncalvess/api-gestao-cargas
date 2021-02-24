import { Router } from 'express';

import ServicesRepository from '../repositories/ServicesRepository';

const serviceRouter = Router();
const servicesRepository = new ServicesRepository();

serviceRouter.get('/', async (request, response) => {
  const service = await servicesRepository.all();

  return response.json(service);
});

serviceRouter.get('/:load', async (request, response) => {
  const { load } = request.params;
  console.log(load);
  try {
    const service = await servicesRepository.getEmployeeByLoad(load);

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
