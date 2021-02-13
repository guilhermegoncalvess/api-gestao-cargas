import { Router } from 'express';

import ServicesRepository from '../repositories/ServicesRepository';

const serviceRouter = Router();
const servicesRepository = new ServicesRepository();

serviceRouter.post('/', async (request, response) => {
  const { employee_id, load_id } = request.body;

  const service = await servicesRepository.createService({
    employee_id,
    load_id,
  });

  return response.json(service);
});

serviceRouter.get('/', async (request, response) => {
  const service = await servicesRepository.all();

  return response.json(service);
});

export default serviceRouter;
