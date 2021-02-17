import { Router } from 'express';

import LoadsRepository from '../repositories/LoadsRepository';

const loadRouter = Router();
const loadsRepository = new LoadsRepository();

loadRouter.post('/', async (request, response) => {
  const { date, company_id, farm_id, weight, value, type } = request.body;

  try {
    const load = await loadsRepository.createLoad({
      date,
      company_id,
      farm_id,
      weight,
      value,
      type,
    });

    return response.json(load);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

loadRouter.get('/', async (request, response) => {
  const loads = await loadsRepository.all();

  return response.json(loads);
});

export default loadRouter;
