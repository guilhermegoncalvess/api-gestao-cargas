import { Router } from 'express';

import LoadsRepository from '../repositories/LoadsRepository';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const loadRouter = Router();
const loadsRepository = new LoadsRepository();

loadRouter.use(ensureAuthenticated);

loadRouter.get('/', async (request, response) => {
  const loads = await loadsRepository.findAll();

  return response.json(loads);

});

loadRouter.post('/', async (request, response) => {
  const { date, company_id, farm_id, weight, cost, type } = request.body;

  const load = await loadsRepository.add({
    date,
    company_id,
    farm_id,
    weight,
    cost,
    type,
  });

  return response.status(201).json(load);

});

export default loadRouter;
