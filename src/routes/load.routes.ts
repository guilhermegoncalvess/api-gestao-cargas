import { Router } from 'express';

import LoadsRepository from '../repositories/LoadsRepository';

const loadRouter = Router();
const loadsRepository = new LoadsRepository();

loadRouter.get('/', async (request, response) => {
  try 
  {
    const loads = await loadsRepository.findAll();

    return response.json(loads);
  } catch (err) {
    return response
      .status(400)
      .json({ message: 'Nenhuma carga foi encontrada.' });
  }
});

loadRouter.post('/', async (request, response) => {
  const { date, company_id, farm_id, weight, cost, type } = request.body;

  try {
    const load = await loadsRepository.add({
      date,
      company_id,
      farm_id,
      weight,
      cost,
      type,
    });

    return response.json(load);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default loadRouter;
