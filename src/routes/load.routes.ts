import { Router } from 'express';

import LoadsRepository from '../repositories/LoadsRepository';

const loadRouter = Router();
const loadsRepository = new LoadsRepository();

loadRouter.post('/', (request, response) => {
  const { date, company, farm, weight, value, type } = request.body;

  const load = loadsRepository.create({
    date,
    company,
    farm,
    weight,
    value,
    type,
  });

  return response.json(load);
});

loadRouter.get('/', (request, response) => {
  const loads = loadsRepository.all();

  return response.json(loads);
});

export default loadRouter;
