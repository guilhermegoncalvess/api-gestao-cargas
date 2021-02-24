import { Router } from 'express';

import LoadsRepository from '../repositories/LoadsRepository';

const loadRouter = Router();
const loadsRepository = new LoadsRepository();

loadRouter.get('/', async (request, response) => {
  const loads = await loadsRepository.findAll();

  return response.json(loads);
});

loadRouter.post('/', async (request, response) => {
  const { date, company_id, farm_id, weight, value, type } = request.body;

  try {
    const load = await loadsRepository.add({
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

export default loadRouter;
