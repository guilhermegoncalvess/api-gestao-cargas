import { Router } from 'express';

import ServicesRepository from '../repositories/ServicesRepository';

const serviceRouter = Router();
const servicesRepository = new ServicesRepository();

serviceRouter.post('/', (request, response) => {
  const { employee, load } = request.body;

  const service = servicesRepository.create({
    employee,
    load,
  });

  return response.json(service);
});

serviceRouter.get('/', (request, response) => {
  const employ = servicesRepository;

  return response.json(employ);
});

export default serviceRouter;
